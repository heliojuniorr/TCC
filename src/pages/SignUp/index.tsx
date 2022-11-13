import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FirebaseUserType } from '../../interfaces/types';
import { database, firebaseRef, firebaseUpdate } from '../../services/firebase';
import styles from '../SignUp/styles.module.scss'

export function SignUp() {
    const navigate = useNavigate()
    const {user, setUser, updateUserValues} = useAuth()
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

    useEffect(() => {
        const unsubscribe = () => {
            updateUserValues()
        }

        return unsubscribe
    }, [])

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
            <div className={styles.formContainer}>
                <div className={styles.formInputGroup}>
                    <div>
                        <div>
                            <label htmlFor="educationInput">Educação formal</label>
                            <input type="text" name="educationInput" id="educationInput" className={styles.textField} value={user?.education} onChange={(e) => {setUser({...user, education: e.target.value})}}/>
                        </div>

                        <div>
                            <label htmlFor="specialtyInput">Especialidade</label>
                            <input type="text" name="specialtyInput" id="specialtyInput" className={styles.textField} value={user?.specialty} onChange={(e) => {setUser({...user, specialty: e.target.value})}}/>
                        </div>
                    </div>
                    
                    <div>
                        <div>
                            <label htmlFor="sectorInput">Área para empreender</label>
                            <input type="text" name="sectorInput" id="sectorInput" className={styles.textField} value={user?.businessArea} onChange={(e) => {setUser({...user, businessArea: e.target.value})}}/>
                        </div>

                        <div>
                            <label htmlFor="locationInput">Localidade</label>
                            <input type="text" name="locationInput" id="locationInput" className={styles.textField} value={user?.location} onChange={(e) => {setUser({...user, location: e.target.value})}}/>
                        </div>
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
            </div>
        </main>
    )
}