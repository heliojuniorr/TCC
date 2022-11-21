import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FirebaseUserType, UserType } from '../../interfaces/types'
import { database, firebaseChild, firebaseGet, firebaseRef, firebaseUpdate } from '../../services/firebase'
import styles from '../SkillDetails/styles.module.scss'

const knowledge: string[] = ['Venture capital', 'Arquitetura de software', 'Gestão de projetos']
const skills: string[] = ['Finanças', 'Relações públicas', 'Mídias', 'Relações humanas']
const experience: string[] = ['Parcerias empresariais', 'Startups', 'C Level', 'Programas de aceleração']
const levels: string[] = ["Nenhum", "Aprendiz", 'Basico', "Intermediario", "Avancado"]

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
    const [selectedLevel, setSelectedLevel] = useState({} as Record<string, 1 | 2 | 3 | 4 | 5>)
    const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

    useEffect(() => {
        const unsubscribe = () => {
            if(user) {
                firebaseGet(userChild).then((snapshot) => {
                    if(snapshot.exists()) {
                        const parsedUser: UserType = snapshot.val()
                        let temp = selectedLevel
                        const promise = Object.entries(parsedUser).map((value) => {
                            //@ts-ignore
                            temp[value[0]] = value[1]
                        })
                        Promise.all(promise)
                            .then(() => {
                                setSelectedLevel(temp)
                            })
                            .catch((error) => {
                                console.error(error)
                            })
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
    }, [user])


    function handleConfirm() {
        if(user) {
            let userUpdates: FirebaseUserType = {}
                userUpdates[`/users/${user.id}`] = {
                    Arquiteturadesoftware: 0,
                    businessArea: 'Não informada',
                    CLevel: 0,
                    education: 'Não informada',
                    Finanças: 0,
                    Gestãodeprojetos: 0,
                    location: 'Não informada',
                    Mídias: 0,
                    Parceriasempresariais: 0,
                    Programasdeaceleração: 0,
                    Relaçõeshumanas: 0,
                    Relaçõespúblicas: 0,
                    specialty: 'Não informada',
                    Startups: 0,
                    Venturecapital: 0,
                    chats: [''],
                    name: user.name,
                    ...selectedLevel
                };
                updateFirebase(userUpdates)
        }
        navigate("/skills")
    }

    function SkillLevel(props: {skillName: string}) {
        const [selected, setSelected] = useState({} as "Nenhum" | "Aprendiz" | 'Basico' | "Intermediario" | "Avancado")

        useEffect(() => {
            const unsubscribe = () => {
                setTimeout(() => {
                    //@ts-ignore
                    setSelected(levelValue[selectedLevel[props.skillName.replaceAll(" ", '')]])
                }, 1000)
            }

            return unsubscribe()    
        }, [selectedLevel])

        const levelValue = {
            1: "Nenhum",
            2: "Aprendiz",
            3: "Basico",
            4: "Intermediario",
            5: "Avancado"
        }

        function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
            if(e.target.name.includes("Nenhum")) {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = 1
                    return value
                })
                setSelected("Nenhum")
            }
            else if(e.target.name.includes("Aprendiz")) {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = 2
                    return value
                })
                setSelected("Aprendiz")
            }
            else if(e.target.name.includes("Basico")) {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = 3
                    return value
                })
                setSelected("Basico")
            }
            else if(e.target.name.includes("Intermediario")) {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = 4
                    return value
                })
                setSelected("Intermediario")
            }
            else {
                setSelectedLevel(value => {
                    value[props.skillName.replaceAll(" ", '')] = 5
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
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirmar habilidades
                    </Button>
                </div>
            </div>

        </main>
    )
}