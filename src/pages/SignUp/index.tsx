import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FirebaseUserType } from '../../interfaces/types';
import { database, firebaseRef, firebaseUpdate } from '../../services/firebase';
import styles from '../SignUp/styles.module.scss'

export function SignUp() {
    const navigate = useNavigate()
    const {user} = useAuth()
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 
    const [education, setEducation] = useState("")
    const [specialty, setSpecialty] = useState("")
    const [businessArea, setBusinessArea] = useState("")
    const [location, setLocation] = useState("")

    function handleSave() {
        if(user) {
            let userUpdates: FirebaseUserType = {}
                userUpdates[`/users/${user.id}`] = {
                    name: user.name,
                    education,
                    location,
                    specialty,
                    businessArea,
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
                            <Form.Control className={styles.textField} type="text" placeholder="Ciência da computação" value={education} onChange={(e) => {setEducation(e.target.value)}}/>
                        </Form.Group> 

                        <Form.Group className="mb-3" controlId="specialtyInput">
                            <Form.Label>Especialidade</Form.Label>
                            <Form.Control className={styles.textField} type="text" placeholder="Desenvolvedor Back-End" value={specialty} onChange={(e) => {setSpecialty(e.target.value)}}/>
                        </Form.Group>   
                    </div>
                    
                    <div>
                        <Form.Group className="mb-3" controlId="sectorInput">
                            <Form.Label>Área para empreender</Form.Label>
                            <Form.Control className={styles.textField} type="text" placeholder="Saúde" value={businessArea} onChange={(e) => {setBusinessArea(e.target.value)}}/>
                        </Form.Group>  

                        <Form.Group className="mb-3" controlId="locationInput">
                            <Form.Label>Localidade</Form.Label>
                            <Form.Control className={styles.textField} type="text" placeholder="São Paulo" value={location} onChange={(e) => {setLocation(e.target.value)}}/>
                        </Form.Group> 
                    </div>
                </div>
                
                <Button variant="primary" type="submit" onClick={handleSave}>
                    Prosseguir
                </Button>
            </Form>
        </main>
    )
}