import { createContext, ReactNode, useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithRedirect, getAuth, getRedirectResult, onAuthStateChanged, signOut } from "../services/firebase"

type User = {
    id: string;
    name: string;
    image: string;
}
  
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
    signOutWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()
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
            image: 'padrao'
          })
          if(true) {
            navigate('/skills')
          }
        }
      })
  
      return () => {
        unsubscribe();
      }
    }, [])
  
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
                    image: 'padrao'
                })
                if(true) {
                  navigate('/skills')
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
        console.log(error)
      });
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle, signOutWithGoogle}}>
            {props.children}
        </AuthContext.Provider>

    )
}