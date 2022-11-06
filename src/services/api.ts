import axios from "axios"
import {} from './firebase'

export const api = axios.create({
    baseURL: "https://cluster-4ynr4qjrha-uc.a.run.app/",
})

export function getUserById(id: number) {
    api
      .get(`/signup/${id}`)
      .then((response) => {return response.data})
      .catch((error) => {
        console.error(error);
      });
}

export function deleteUserById() {

}

export function updateUserById() {

}