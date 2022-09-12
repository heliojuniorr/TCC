import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss'

export function Home() {
    const navigate = useNavigate()

    return (
        <main className={styles.homeContainer}>
            <h2>Cadastre-se</h2>
            <Form className={styles.formContainer}>
                <div className={styles.formInputGroup}>
                    <div>
                        <Form.Group className="mb-3" controlId="nameInput">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control className={styles.textField} type="text" placeholder="Silvio" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="educationInput">
                            <Form.Label>Educação formal</Form.Label>
                            <Form.Control className={styles.textField} type="text" placeholder="Ciência da computação" />
                        </Form.Group>  

                        <Form.Group className="mb-3" controlId="emailInput">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control className={styles.textField} type="email" placeholder="silviosantos@sbt.com" />
                        </Form.Group>
                    </div>
                    
                    <div>
                        <Form.Group className="mb-3" controlId="specialtyInput">
                            <Form.Label>Especialidade</Form.Label>
                            <Form.Control className={styles.textField} type="text" placeholder="Desenvolvedor Back-End" />
                        </Form.Group>  

                        <Form.Group className="mb-3" controlId="sectorInput">
                            <Form.Label>Área para empreender</Form.Label>
                            <Form.Control className={styles.textField} type="text" placeholder="Saúde" />
                        </Form.Group>  

                        <Form.Group className="mb-3" controlId="locationInput">
                            <Form.Label>Localidade</Form.Label>
                            <Form.Control className={styles.textField} type="text" placeholder="São Paulo" />
                        </Form.Group> 
                    </div>
                </div>
                
                <button className={styles.signUpButton} type="submit" onClick={() => {navigate("/skills")}}>
                    Cadastrar
                </button>
            </Form>

            <div className={styles.signOnContainer}>
                <span>Já possui cadastro?</span>
                <button className={styles.signOnButton}>Entrar</button>
            </div>
        </main>
    )
}