import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FirebaseUserType } from '../../interfaces/types';
import { database, firebaseRef, firebaseUpdate } from '../../services/firebase';
import styles from '../SignUp/styles.module.scss'

export function SignUp() {
    const navigate = useNavigate()
    const {user, setUser} = useAuth()
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

    function handleSave() {
        if(user) {
            let userUpdates: FirebaseUserType = {}
            let userAux = Object.assign({}, user)
            delete userAux.id
                userUpdates[`/users/${user.id}`] = {
                    ...userAux,
                };
                updateFirebase(userUpdates)
        }
        navigate("/skills")
    }

    return (
        <main className={styles.signUpContainer}>
            <h2>Informações básicas</h2>
            <Form className={styles.formContainer}>
                <div className={styles.formInputGroup}>
                    <div>
                        <Form.Group className="mb-3" controlId="educationInput">
                            <Form.Label>Educação formal</Form.Label>
                            <Form.Control className={styles.textField} type="text" value={user?.education} onChange={(e) => {setUser({...user, education: e.target.value})}}/>
                        </Form.Group> 

                        <Form.Group className="mb-3" controlId="specialtyInput">
                            <Form.Label>Especialidade</Form.Label>
                            <Form.Control className={styles.textField} type="text" value={user?.specialty} onChange={(e) => {setUser({...user, specialty: e.target.value})}}/>
                        </Form.Group>   
                    </div>
                    
                    <div>
                        <Form.Group className="mb-3" controlId="sectorInput">
                            <Form.Label>Área para empreender</Form.Label>
                            <Form.Control className={styles.textField} type="text" value={user?.businessArea} onChange={(e) => {setUser({...user, businessArea: e.target.value})}}/>
                        </Form.Group>  

                        <Form.Group className="mb-3" controlId="locationInput">
                            <Form.Label>Localidade</Form.Label>
                            <Form.Control className={styles.textField} type="text" value={user?.location} onChange={(e) => {setUser({...user, location: e.target.value})}}/>
                        </Form.Group> 
                    </div>
                </div>
                
                <div className={styles.buttonsContainer}>
                    <Button variant="primary" type="submit" onClick={() => {navigate('/skills')}}>
                        Voltar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Confirmar dados
                    </Button>
                </div>
            </Form>
        </main>
    )
}