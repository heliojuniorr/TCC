import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { ApiUserType } from '../../interfaces/types'
import styles from '../Chats/styles.module.scss'

export function Chats() {
    const {updateUserValues, chatUsers, setChatId, updateChatById, getChatUserName, user} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = () => {
            updateUserValues()
        }

        return unsubscribe
    }, [])

    function getChatId(urlId: string) {
        let chatId = ''
        if(user && user.id && urlId) {
            if(user.id > urlId)
                chatId = `${urlId}-${user.id}`
            else 
                chatId = `${user.id}-${urlId}`
        }

        return chatId
    }

    function Entity(props: ({value: ApiUserType})) {
        const navigate = useNavigate()
        function handleGetInTouch() {
            setChatId(getChatId(props.value.id))
            updateChatById(getChatId(props.value.id))
            getChatUserName(props.value.id)
            navigate(`/chat/${props.value.id}`)
        }

        return (
            <div className={styles.entityContainer}>
                <div>
                    <div>Nome: {props.value.name}</div>
                    <div>Localidade: {props.value.location}</div>
                    <div>Especialidade: {props.value.specialty}</div>
                    <div>Área para empreender: {props.value.businessArea}</div>
                    <div>Educação: {props.value.education}</div>
                </div>

                <button onClick={handleGetInTouch}>
                    Entrar em contato
                </button>
            </div>
        )
    }

    return (
        <main className={styles.chatsContainer}>
            <div className={styles.chatsUsersContainer}>
                {
                    chatUsers?.map((value) => {
                        return (
                            <Entity key={value.id} value={value}/>
                        )
                    })
                }
            </div>

            <Button variant="primary" onClick={() => {navigate(-1)}}>
                    Voltar
            </Button>
        </main>
    )
}