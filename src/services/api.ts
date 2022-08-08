import axios from "axios"

const api = axios.create({
    baseURL: "/api"
})

export function createUser() {

}

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