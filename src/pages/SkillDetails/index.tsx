import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../SkillDetails/styles.module.scss'

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
            <h2>Skills | {urlParams.skill}</h2>
            <h5>Escolha suas habilidades e domínio referente ao grupo de habilidades escolhido</h5>
            <div className={styles.boardContainer}>
                <SkillLevel skillName="C#"/>
                <SkillLevel skillName="JavaScript"/>
                <SkillLevel skillName="HTML"/>
                <SkillLevel skillName="Banco de dados"/>

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