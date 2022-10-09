import { database, firebaseChild, firebaseGet, firebasePush, firebaseRef, firebaseUpdate } from "../services/firebase"
import { useAuth } from "./useAuth"

type UserType = {
    id?: string,
    name?: string
}

type FirebaseUserType = Record<string, {
    name?: string
}>

export function useEvent() {
    const { user } = useAuth()
    const userChild = firebaseChild(firebaseRef(database), `users/${user?.id}`)
    const eventChild = (eventId?: string) => firebaseChild(firebaseRef(database), `events/${eventId ?? ""}`)
    const groupChild = (groupId?: string) => firebaseChild(firebaseRef(database), `groups/${groupId ?? ""}`)
    const updateFirebase = (updates: any) => firebaseUpdate(firebaseRef(database), updates) 

    function updateUser(eventKey: string) {
        firebaseGet(userChild).then((snapshot) => {
            if(snapshot.exists()) {
                const parsedUser: UserType = snapshot.val()

                let updates: FirebaseUserType = {}
                if(eventKey !== '') {
                    if(user?.id) {
                        updates[`/users/${user.id}`] = {
                            ...parsedUser,
                            name: user.name,
                        };
                        updateFirebase(updates)
                    }
                }
            }
            else {
                console.error("No data available!")
            }
        }).catch(error => console.error(error))
    }

    return { 
        updateUser, 
    }
}