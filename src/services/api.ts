import axios from "axios"
import {} from './firebase'

export const api = axios.create({
    baseURL: "https://cluster-4ynr4qjrha-uc.a.run.app/",
})