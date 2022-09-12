import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import styles from '../Search/styles.module.scss'

export function Search() {
    const navigate = useNavigate()

    const teste = {
        nome: "André",
        localizacao: "SP",
        especialidade: "TI"
    }

    function Entity() {

        return (
            <div className={styles.entityContainer}>
                <div>
                    <div>Nome: {teste.nome}</div>
                    <div>Localização: {teste.localizacao}</div>
                    <div>Especialidade: {teste.especialidade}</div>
                </div>

                <button>Entrar em contato</button>
            </div>
        )
    }
    
    return (
        <main className={styles.searchOnContainer}>
            <h2>Buscar recomendações para colaborar</h2>
            <div className={styles.entitiesContainer}>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
                <Entity/>
            </div>  

            <div className={styles.buttonsContainer}>
                <Button variant="primary" type="submit" onClick={() => {navigate("/skills")}}>
                    Voltar
                </Button>
                <Button variant="primary" type="submit" onClick={() => {navigate("/")}}>
                    Buscar colaboradores
                </Button>
            </div>  
        </main>
    )
}