import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { MessageType, FirebaseMessageType } from '../../interfaces/types'
import { database, firebaseChild, firebaseGet, firebasePush, firebaseRef, firebaseUpdate } from '../../services/firebase'
import styles from './styles.module.scss'

export function Chat() {
    const navigate = useNavigate()
    const urlParams = useParams<{id: string}>()
    const {user} = useAuth()
    const [messages, setMessages] = useState({} as MessageType[])
    const [messageInput, setMessageInput] = useState("")

    const chatChild = (chatId: string) => firebaseChild(firebaseRef(database), `chats/${chatId}`)
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
            <h3>Conversa com {urlParams.id}</h3>

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
                <button className={styles.button} onClick={handleSendMessage}>
                    Enviar
                </button>

                <button className={styles.button} onClick={() => navigate('/search')}>
                    Voltar
                </button>
            </div>
        </main>
    )
}