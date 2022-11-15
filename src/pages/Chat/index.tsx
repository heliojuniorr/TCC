import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { MessageType, FirebaseMessageType, FirebaseChatsType } from '../../interfaces/types'
import { database, firebaseChild, firebasePush, firebaseRef, firebaseUpdate } from '../../services/firebase'
import styles from './styles.module.scss'

export function Chat() {
    const navigate = useNavigate()
    const urlParams = useParams<{id: string}>()
    const {user, chatUserName, messages, updateChatById} = useAuth()
    const [messageInput, setMessageInput] = useState("")

    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 
    let chatId = ""

    function getChatId() {
        if(user && user.id && urlParams?.id) {
            if(user.id > urlParams.id)
                chatId = `${urlParams.id}-${user.id}`
            else 
                chatId = `${user.id}-${urlParams.id}`
        }

        return chatId
    }

    function handleSendMessage() {
        const messagesChild = firebaseChild(firebaseRef(database), `chats/${chatId}/`)
        const newMessageId = firebasePush(messagesChild).key
        getChatId()

        let updates: FirebaseMessageType = {}
        
        if(user?.name) {
            updates[`chats/${chatId}/${newMessageId}`] = {
                authorName: user.name,
                content: messageInput
            };
            updateFirebase(updates)
        }

        let userUpdate: FirebaseChatsType = {}

        if(user?.id) {
            userUpdate[`users/${urlParams.id || ''}/chats/`] = user?.chats?.concat(chatId) || [chatId]
            userUpdate[`users/${user.id}/chats`] = user?.chats?.concat(chatId) || [chatId]
            updateFirebase(userUpdate)
        }

        updateChatById(getChatId())
        setMessageInput("")
    }

    function Message(props: ({message: MessageType})) {

        return (
            <div className={styles.messageContainer}>
                <div>{props.message.authorName}</div>
                <span>{props.message.content}</span>
            </div>
        )
    }

    return (
        <main className={styles.chatContainer}>
            <h3>Conversa com {chatUserName}</h3>
            <h6 className={styles.warning}>Cuidado ao compartilhar dados pessoais ou que sejam importante para algum projeto.</h6>

            <div className={styles.messagesContainer}>
                {
                    Object.entries(messages).map((value, index) => {
                        return (
                            <Message key={index} message={value[1]}/>
                        )
                    })
                }
            </div>

            <div className={styles.footer}>
                <input type="text" value={messageInput} onChange={(e) => {setMessageInput(e.target.value)}}/>
                <Button variant="primary" onClick={handleSendMessage}>
                    Enviar
                </Button>
                <Button variant="primary" onClick={() => {navigate(-1)}}>
                    Voltar
                </Button>
            </div>
        </main>
    )
}