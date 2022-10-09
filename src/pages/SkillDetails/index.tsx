import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FirebaseUserType, UserType } from '../../interfaces/types'
import { database, firebaseChild, firebaseGet, firebaseRef, firebaseUpdate } from '../../services/firebase'
import styles from '../SkillDetails/styles.module.scss'

const knowledge: string[] = ['Venture capital', 'Arquitetura de software', 'Gestão de projetos']
const skills: string[] = ['Finanças', 'Relações públicas', 'Mídias', 'Relações humanas']
const experience: string[] = ['Parcerias empresariais', 'Startups', 'C-Level', 'Programas de aceleração']
const levels: string[] = ["None", "Aprendiz", 'Basico', "Intermediario", "Avancado"]

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
    const {user} = useAuth()
    const urlParams = useParams<{skill: string}>()
    const [selectedLevel, setSelectedLevel] = useState({} as Record<string, "None" | "Aprendiz" | 'Basico' | "Intermediario" | "Avancado">)
    const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

    useEffect(() => {
        const unsubscribe = () => {
            if(user) {
                firebaseGet(userChild).then((snapshot) => {
                    if(snapshot.exists()) {
                        const parsedUser: UserType = snapshot.val()
                        console.log(parsedUser)
                    }
                    else {
                        let userUpdates: FirebaseUserType = {}
                        userUpdates[`/users/${user.id}`] = {
                            name: user.name
                        };
                        updateFirebase(userUpdates)
                    }
                }).catch(error => console.error(error))
            }
        }

        return unsubscribe
    }, [])


    function handleConfirm() {
        console.log(selectedLevel)
        navigate('/skills')
    }

    function SkillLevel(props: {skillName: string}) {
        const [selected, setSelected] = useState({} as "None" | "Aprendiz" | 'Basico' | "Intermediario" | "Avancado")

        function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
            if(e.target.name.includes("None")) {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = "None"
                    return value
                })
                setSelected("None")
            }
            else if(e.target.name.includes("Aprendiz")) {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = "Aprendiz"
                    return value
                })
                setSelected("Aprendiz")
            }
            else if(e.target.name.includes("Basico")) {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = "Basico"
                    return value
                })
                setSelected("Basico")
            }
            else if(e.target.name.includes("Intermediario")) {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = "Intermediario"
                    return value
                })
                setSelected("Intermediario")
            }
            else {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = "Avancado"
                    return value
                })
                setSelected("Avancado")
            }
        }

        return (
            <div className={styles.skillLevelContainer}>
                <h5>{props.skillName}</h5>
                <div className={styles.radioButtonContainer}>
                    <span>Domínio</span>
                    {
                        levels.map((value, index) => {
                            return (
                                <div className={styles.radioButton} key={index}>
                                    <input 
                                        type="radio" 
                                        name={`${props.skillName.replaceAll(" ", '')}${value}Level`} 
                                        id={`${props.skillName.replaceAll(" ", '')}${value}Level`} 
                                        checked={selected === value}
                                        onChange={handleOnChange}
                                    />
                                    <label htmlFor={`${props.skillName.replaceAll(" ", '')}${value}Level`}>{value}</label>
                                </div>
                            )
                        })
                    }
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
                    <Button variant="primary" type="submit" onClick={handleConfirm}>
                        Confirmar habilidades
                    </Button>
                </div>
            </div>

        </main>
    )
}