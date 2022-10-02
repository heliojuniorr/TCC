import { useNavigate, useParams } from 'react-router-dom'
import { Message } from '../../components/Message'
import styles from './styles.module.scss'

export function Chat() {
    const navigate = useNavigate()
    const urlParams = useParams<{id: string}>()

    function handleSendMessage() {

    }

    return (
        <main className={styles.chatContainer}>
            <h3>Conversa com {urlParams.id}</h3>

            <div className={styles.messagesContainer}>
                <Message/>
                <Message/>
                <Message/>
            </div>

            <div className={styles.footer}>
                <input type="text" />
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