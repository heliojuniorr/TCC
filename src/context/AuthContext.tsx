import { createContext, ReactNode, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { FirebaseUserType, UserType } from "../interfaces/types";
import { GoogleAuthProvider, signInWithRedirect, getAuth, getRedirectResult, onAuthStateChanged, signOut, firebaseChild, firebaseRef, database, firebaseGet, firebaseUpdate } from "../services/firebase"

type AuthContextType = {
    user: UserType | undefined;
    signInWithGoogle: () => Promise<void>;
    signOutWithGoogle: () => Promise<void>;
    updateUserValues: () => void;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<UserType>()
    const auth = getAuth()
    const navigate = useNavigate()

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { displayName, uid } = user
          if(!displayName) {
            throw new Error('Missing information from Google account.')
          }
          setUser({
            id: uid,
            name: displayName,
          })

          updateUserValues()
          if(true) {
            navigate('/skills')
          }
        }
      })
  
      return () => {
        unsubscribe();
      }
    }, [])

    function updateUserValues() {
      const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)
      const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

      firebaseGet(userChild).then((snapshot) => {
        if(!snapshot.exists() && user) {
            let userUpdates: FirebaseUserType = {}
            userUpdates[`/users/${user.id}`] = {
                Arquiteturadesoftware: 0,
                businessArea: 'Não informada',
                CLevel: 0,
                education: 'Não informada',
                Finanças: 0,
                Gestãodeprojetos: 0,
                institutional: false,
                location: 'Não informada',
                Mídias: 0,
                name: user.name,
                Parceriasempresariais: 0,
                Programasdeaceleração: 0,
                Relaçõeshumanas: 0,
                Relaçõespúblicas: 0,
                specialty: 'Não informada',
                Startups: 0,
                Venturecapital: 0,
                ...user
            };
            updateFirebase(userUpdates)
        }
        else if(snapshot.exists() && user) {
          setUser({...snapshot.val(), ...user})
        }
      }).catch(error => console.error(error))
    }
  
    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider()
        const auth = getAuth()
        signInWithRedirect(auth, provider)
        getRedirectResult(auth).then((result) => {
            if(result?.user) {
                //const credential = GoogleAuthProvider.credentialFromResult(result);
                //const token = credential?.accessToken;
                //console.log(token)
                const { displayName, uid } = result.user
                if(!displayName) {
                    throw new Error('Missing information from Google account.')
                }
                setUser({
                    id: uid,
                    name: displayName,
                })

                updateUserValues()
                
                if(true) {
                  navigate("/signUp")
                }
            }
        }).catch((error) => {
            //const errorCode = error.code;
            //const errorMessage = error.message;
            //const email = error.email;
            //const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    async function signOutWithGoogle() {
      const auth = getAuth();
      signOut(auth).then(() => {
        navigate('/')
      }).catch((error) => {
        console.error(error)
      });
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle, signOutWithGoogle, updateUserValues}}>
            {props.children}
        </AuthContext.Provider>

    )
}