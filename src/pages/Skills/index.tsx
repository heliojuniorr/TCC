import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import knowledgeImg from '../../resources/knowledge.svg'
import skillsImg from '../../resources/skills.svg'
import designImg from '../../resources/design.svg'
import configImg from '../../resources/config.svg'
import styles from '../Skills/styles.module.scss'
import { useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

export function Skills() {
    const {user, updateUserValues} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const unsubscribe = () => {
            updateUserValues()
        }

        return unsubscribe
    }, [])

    function SkillsOption(props: {skillType: string, source: string, label?: string}) {
        function handleOnClick() {
            if(props.skillType == 'signUp')
                navigate('/signup/')
            else 
                navigate(`/skilldetails/${props.skillType}`)
        }

        return (
            <button className={styles.skillsOption} onClick={handleOnClick}>
                <img src={props.source} alt="Skill image" />
                <br />
                <span>{props.label || props.skillType}</span>
            </button>
        )
    }

    return (
        <main className={styles.skillsContainer}>
            <h2>Características</h2>
            <h5>Selecione suas características que podem colaborar com um empreendimento de base tecnológica</h5>
            <div className={styles.boardContainer}>
                <div className={styles.grid}>
                    <SkillsOption skillType='knowledge' label="Conhecimentos" source={knowledgeImg}/>
                    <SkillsOption skillType='skills' label="Habilidades" source={skillsImg}/>
                    <SkillsOption skillType='experience' label="Experiências" source={designImg}/>
                    <SkillsOption skillType='signUp' label="Dados cadastrais" source={configImg}/>
                </div>

                <div className={styles.buttonsContainer}>
                    <Button variant="primary" onClick={() => {navigate("/")}}>
                        Voltar
                    </Button>
                    <Button variant="primary" onClick={() => {navigate("/chats")}}>
                        Conversas
                    </Button>
                    <Button variant="primary" onClick={() => {navigate("/search")}}>
                        Prosseguir
                    </Button>
                </div>
            </div>
        </main>
    )
}