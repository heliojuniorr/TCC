import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { MessageType, FirebaseMessageType, UserType, FirebaseUserType, FirebaseChatsType } from '../../interfaces/types'
import { database, firebaseChild, firebaseGet, firebasePush, firebaseRef, firebaseUpdate } from '../../services/firebase'
import styles from './styles.module.scss'

export function Chat() {
    const navigate = useNavigate()
    const urlParams = useParams<{id: string}>()
    const {user} = useAuth()
    const [messages, setMessages] = useState({} as MessageType[])
    const [messageInput, setMessageInput] = useState("")
    const [name, setName] = useState("")

    const chatChild = (chatId: string) => firebaseChild(firebaseRef(database), `chats/${chatId}`)
    const userChild = firebaseChild(firebaseRef(database), `users/${urlParams.id}`)
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 
    let chatId = ""

    function getChatId() {
        if(user && user.id && urlParams?.id) {
            if(user.id > urlParams.id)
                chatId = `${urlParams.id}-${user.id}`
            else 
                chatId = `${user.id}-${urlParams.id}`
        }
    }

    function updateChat() {
        if(user && user.id && urlParams?.id) {
            getChatId()
                
            firebaseGet(chatChild(chatId)).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedMessages: MessageType[] = snapshot.val()
                    setMessages(parsedMessages)
                }
            }).catch(error => console.error(error))
        }
    }

    useEffect(() => {
        const unsubscribe = () => {
            updateChat()
            setInterval(() => {
                updateChat()
            }, 5000)

            if(user) {
                firebaseGet(userChild).then((snapshot) => {
                    if(snapshot.exists()) {
                        const parsedUser: UserType = snapshot.val()
                        setName(parsedUser.name || "")
                    }
                }).catch(error => console.error(error))
            }
        }

        return unsubscribe
    }, [])

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

        setMessageInput("")
    }

    function Message(props: ({message: MessageType})) {

        return (
            <div className={styles.messageContainer}>
                <h6>{props.message.authorName}</h6>
                <h5>{props.message.content}</h5>
            </div>
        )
    }

    return (
        <main className={styles.chatContainer}>
            <h3>Conversa com {name}</h3>
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