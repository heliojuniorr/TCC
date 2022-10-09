import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './styles.module.scss'

export function Home() {
    const {signInWithGoogle, user} = useAuth()
    const navigate = useNavigate()

    async function handleLogon() {
        if(!user) 
            await signInWithGoogle()
        else
            navigate("/skills")
    }

    return (
        <main className={styles.homeContainer}>
            <h2>Cadastrar/entrar</h2>
            <button className={styles.signUpButton} onClick={handleLogon}>
                Cadastrar
            </button>
        </main>
    )
}