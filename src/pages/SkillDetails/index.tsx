import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../SkillDetails/styles.module.scss'

const knowledge: string[] = ['Venture capital', 'Arquitetura de software', 'Gestão de projetos']
const skills: string[] = ['Finanças', 'Relações públicas', 'Mídias', 'Relações humanas']
const experience: string[] = ['Parcerias empresariais', 'Startups', 'C-Level', 'Programas de aceleração']

const specificSkills = {
    "knowledge": knowledge,
    "skills": skills,
    "experience": experience,
}

const label = {
    "knowledge": "Conhecimentos",
    "skills": "Habilidades",
    "experience": "Experiências",
}

export function SkillDetails() {
    const navigate = useNavigate()
    const urlParams = useParams<{skill: string}>()

    function SkillLevel(props: {skillName: string}) {
        return (
            <div className={styles.skillLevelContainer}>
                <div>
                    <input id={`${props.skillName}CheckBox`} type="checkbox" name='' value=""/>
                    <label htmlFor={`${props.skillName}CheckBox`}>{props.skillName}</label>
                </div>

                <div className={styles.radioButtonContainer}>
                    <span>Domínio</span>
                    <div className={styles.radioButton}>
                        <input type="radio" name={`${props.skillName}Level`} id={`${props.skillName}AprendizLevel`}/>
                        <label htmlFor={`${props.skillName}AprendizLevel`}>Aprendiz</label>
                    </div>
                    
                    <div className={styles.radioButton}>
                        <input type="radio" name={`${props.skillName}Level`} id="basicoLevel"/>
                        <label htmlFor={`${props.skillName}BasicoLevel`}>Básico</label>
                    </div>
                    
                    <div className={styles.radioButton}>
                        <input type="radio" name={`${props.skillName}Level`} id="intermediarioLevel"/>
                        <label htmlFor={`${props.skillName}IntermediarioLevel`}>Intermediário</label>
                    </div>

                    <div className={styles.radioButton}>
                        <input type="radio" name={`${props.skillName}Level`} id="avancadoLevel"/>
                        <label htmlFor={`${props.skillName}AvancadoLevel`}>Avançado</label>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <main className={styles.skillsContainer}>
            {/*@ts-ignore*/}
            <h2>{label[urlParams.skill]}</h2>
            <h5>Escolha o seu domínio referente a cada característica</h5>
            <div className={styles.boardContainer}>
                {
                    //@ts-ignore
                    specificSkills[urlParams.skill].map((value, index) => {
                        return <SkillLevel key={index} skillName={value}/>
                    })
                }

                <div className={styles.buttonsContainer}>
                    <Button variant="primary" type="submit" onClick={() => {navigate('/skills')}}>
                        Voltar
                    </Button>
                    <Button variant="primary" type="submit" onClick={() => {navigate('/skills')}}>
                        Confirmar habilidades
                    </Button>
                </div>
            </div>

        </main>
    )
}