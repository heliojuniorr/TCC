import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './styles.module.scss'

export function Home() {
    const {signInWithGoogle, user} = useAuth()
    const navigate = useNavigate()

    async function handleLogon() {
        if(!user) { 
            await signInWithGoogle()
        }
    }

    return (
        <main className={styles.homeContainer}>
            <h2>Cadastre-se</h2>
            <Form className={styles.formContainer}>
                <div className={styles.formInputGroup}>
                </div>
                
                <button className={styles.signUpButton} type="submit" onClick={() => {navigate("/skills")}}>
                    Cadastrar
                </button>
            </Form>

            <div className={styles.signOnContainer}>
                <span>Já possui cadastro?</span>
                <button className={styles.signOnButton}>Entrar</button>
            </div>
        </main>
    )
}