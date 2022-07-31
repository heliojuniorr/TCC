import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import styles from '../Search/styles.module.scss'

export function Search() {
    const navigate = useNavigate()
    
    return (
        <main className={styles.searchOnContainer}>
            <h2>Busca por perfil desejado</h2>
            <h5>Especifque a(s) competência(s) desejada(s) para auxiliar no empreendimento</h5>
            <div className={styles.boardContainer}>
                <div>
                    <span>Habilidades esperadas</span>

                    <select name="" id="">
                        <option value=""></option>
                    </select>
                </div>


                <div>
                    <Button variant="primary" type="submit" onClick={() => {navigate("/skills")}}>
                        Voltar
                    </Button>
                    <Button variant="primary" type="submit" onClick={() => {navigate("/")}}>
                        Buscar colaboradores
                    </Button>
                </div>
                
            </div>    
        </main>
    )
}