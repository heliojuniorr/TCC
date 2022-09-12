import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import knowledgeImg from '../../resources/knowledge.svg'
import skillsImg from '../../resources/skills.svg'
import designImg from '../../resources/design.svg'
import styles from '../Skills/styles.module.scss'

export function Skills() {
    const navigate = useNavigate()

    function SkillsOption(props: {skillType: string, source: string, label?: string}) {
        return (
            <button className={styles.skillsOption} onClick={() => {navigate(`/skilldetails/${props.skillType}`)}}>
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