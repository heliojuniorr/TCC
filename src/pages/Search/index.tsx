import { useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { ApiUserType} from "../../interfaces/types"
import { api } from "../../services/api"
import { database, firebaseChild, firebaseRef } from "../../services/firebase"
import styles from '../Search/styles.module.scss'

export function Search() {
    const navigate = useNavigate()
    const {user} = useAuth()
    const usersChild = firebaseChild(firebaseRef(database), `users/`)
    const [searchResult, setSearchResult] = useState<ApiUserType[]>([] as ApiUserType[])

    function Entity(props: ({value: ApiUserType})) {
        function handleGetInTouch() {
            console.log(props.value)
            navigate(`/chat/${props.value.id}`)
        }

        return (
            <div className={styles.entityContainer}>
                <div>
                    <div>Nome: {props.value.name}</div>
                    <div>Localidade: {props.value.location}</div>
                    <div>Especialidade: {props.value.specialty}</div>
                    <div>Área para empreender: {props.value.businessArea}</div>
                    <div>Educação: {props.value.education}</div>
                </div>

                <button onClick={handleGetInTouch}>
                    Entrar em contato
                </button>
            </div>
        )
    }
    
    function handleSearch() {
        if(user && user.id) {
            api(
                {
                  method: "get",
                  url: `top?id=${user?.id}`
                }
              ).then((response) => {
                setSearchResult(response.data)
              })
              .catch((error) => {console.error(error)})
        }
    }
    
    return (
        <main className={styles.searchOnContainer}>
            <h2>Buscar recomendações para colaborar</h2>
            <div className={styles.entitiesContainer}>
                {
                    Object.entries(searchResult)?.map((value) => {
                        return (
                            <Entity key={value[0]} value={{...value[1], id: value[0]}}/>
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