import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styles from '../Skills/styles.module.scss'

export function Skills() {
    const navigate = useNavigate()

    function SkillsOption(props: {skillType: string}) {
        return (
            <button className={styles.skillsOption} onClick={() => {navigate(`/skilldetails/${props.skillType}`)}}>
                <img src="" alt="Skill image" />
                <br />
                <span>{props.skillType}</span>
            </button>
        )
    }

    return (
        <main className={styles.skillsContainer}>
            <h2>Habilidades</h2>
            <h5>Selecione suas habilidades que podem colaborar com um empreendimento de base tecnológica</h5>
            <div className={styles.boardContainer}>
                <div className={styles.grid}>
                    <SkillsOption skillType='Software'/>
                    <SkillsOption skillType='Business'/>
                    <SkillsOption skillType='Design'/>
                    <SkillsOption skillType='Networking'/>                    
                </div>

                <div className={styles.buttons}>
                    <Button variant="primary" type="submit" onClick={() => {navigate("/")}}>
                        Voltar
                    </Button>
                    <Button variant="primary" type="submit" onClick={() => {navigate("/search")}}>
                        Prosseguir
                    </Button>
                </div>
            </div>
        </main>
    )
}