import { useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FirebaseUserType, UserType } from "../../interfaces/types"
import { database, firebaseChild, firebaseGet, firebaseRef } from "../../services/firebase"
import styles from '../Search/styles.module.scss'

export function Search() {
    const navigate = useNavigate()
    const usersChild = firebaseChild(firebaseRef(database), `users/`)
    const [searchResult, setSearchResult] = useState<FirebaseUserType[]>({} as FirebaseUserType[])

    function Entity(props: ({value: UserType})) {
        function handleGetInTouch() {
            navigate(`/chat/${props.value.id}`)
        }

        return (
            <div className={styles.entityContainer}>
                <div>
                    <div>Nome: {props.value.name}</div>
                    <div>Localidade: {props.value.location}</div>
                </div>

                <button onClick={handleGetInTouch}>
                    Entrar em contato
                </button>
            </div>
        )
    }
    
    function handleSearch() {
        firebaseGet(usersChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedUsers: FirebaseUserType[] = snapshot.val()
                setSearchResult(parsedUsers)
            }
            
        }).catch(error => console.error(error))
    }
    
    return (
        <main className={styles.searchOnContainer}>
            <h2>Buscar recomendações para colaborar</h2>
            <div className={styles.entitiesContainer}>
                {
                    Object.entries(searchResult).map((value) => {
                        return (
                            <Entity key={value[0]} value={{id: value[0], ...value[1]}}/>
                        )
                    })
                }

            </div>  

            <div className={styles.buttonsContainer}>
                <Button variant="primary" onClick={() => {navigate("/skills")}}>
                    Voltar
                </Button>
                <Button variant="primary" onClick={handleSearch}>
                    Buscar colaboradores
                </Button>
            </div>  
        </main>
    )
}