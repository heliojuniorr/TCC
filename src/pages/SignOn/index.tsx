import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../SignOn/styles.module.scss'

export function SignOn() {
    return (
        <main className={styles.signOnContainer}>
            <h2>Informações básicas</h2>
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
                

                <Button variant="primary" type="submit">
                    Prosseguir
                </Button>
            </Form>
            
        </main>
    )
}