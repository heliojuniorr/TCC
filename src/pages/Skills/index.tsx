import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import knowledgeImg from '../../resources/knowledge.svg'
import skillsImg from '../../resources/skills.svg'
import designImg from '../../resources/design.svg'
import styles from '../Skills/styles.module.scss'
import logoImg from "../../resources/logo.svg"
import { useEffect, useState } from 'react'
import { database, firebaseChild, firebaseGet, firebaseRef, firebaseUpdate } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'
import { FirebaseUserType, UserType } from '../../interfaces/types'

export function Skills() {
    const {user} = useAuth()
    const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 
    const navigate = useNavigate()
    const [institutional, setInstitutional] = useState(false)

    useEffect(() => {
        const unsubscribe = () => {
            setTimeout(() => {
                if(user) {
                    firebaseGet(userChild).then((snapshot) => {
                        if(snapshot.exists()) {
                            const parsedUser: UserType = snapshot.val()
                            setInstitutional(parsedUser.institutional ?? false)
                        }
                    }).catch(error => console.error(error))
                }
            }, 1000)
        }

        return unsubscribe()
    }, [user])

    function SkillsOption(props: {skillType: string, source: string, label?: string}) {
        return (
            <button className={styles.skillsOption} onClick={() => {navigate(`/skilldetails/${props.skillType}`)}}>
                <img src={props.source} alt="Skill image" />
                <br />
                <span>{props.label || props.skillType}</span>
            </button>
        )
    }

    function handleInstitutionChange() {
        if(user) {
            firebaseGet(userChild).then((snapshot) => {
                if(snapshot.exists()) {
                    const parsedUser: UserType = snapshot.val()
                    let temp: FirebaseUserType = {}
                    const promise = Object.entries(parsedUser).map((value) => {
                        //@ts-ignore
                        temp[value[0]] = value[1]
                    })
                    Promise.all(promise)
                        .then(() => {
                            let userUpdates: FirebaseUserType = {}
                            userUpdates[`/users/${user.id}`] = {
                                ...temp,
                                institutional: !institutional
                            };
                            updateFirebase(userUpdates)
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

        setInstitutional(value => !value)
    }

    return (
        <main className={styles.skillsContainer}>
            <h2>Características</h2>
            <h5>Selecione suas características que podem colaborar com um empreendimento de base tecnológica</h5>
            <div className={styles.boardContainer}>
                <input 
                    type="checkbox" 
                    name="institutionCheckBox" 
                    id="institutionCheckBox" 
                    checked={institutional}
                    onChange={handleInstitutionChange}
                />
                <label htmlFor="institutionCheckBox">Instituição</label>
                <div className={styles.grid}>
                    <SkillsOption skillType='knowledge' label="Conhecimentos" source={knowledgeImg}/>
                    <SkillsOption skillType='skills' label="Habilidades" source={skillsImg}/>
                    <SkillsOption skillType='experience' label="Experiências" source={designImg}/>
                </div>

                <div className={styles.buttonsContainer}>
                    <Button variant="primary" onClick={() => {navigate("/")}}>
                        Voltar
                    </Button>
                    <Button variant="primary" onClick={() => {navigate("/search")}}>
                        Prosseguir
                    </Button>
                </div>
            </div>
        </main>
    )
}