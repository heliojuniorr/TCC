import styles from './styles.module.scss'

export function Message() {


    return (
        <div className={styles.messageContainer}>
            <h6>Nome</h6>
            <h5>Mensagem</h5>
        </div>
    )
}