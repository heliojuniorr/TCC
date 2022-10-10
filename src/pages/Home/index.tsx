import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './styles.module.scss'
import googleIconImg from "../../resources/google-icon.svg"
import logoImg from "../../resources/logo.svg"

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
            <img src={logoImg} alt="Logo" />
            <strong>Encontre conexões para a sua jornada de empreendedorismo</strong>
            <p>Conheça pessoas e instituições que te complementam</p>
            <button className={styles.signUpButton} onClick={handleLogon}>
                <img src={googleIconImg} alt="Logo do Google" />
                Entre com sua conta do Google
            </button>
        </main>
    )
}