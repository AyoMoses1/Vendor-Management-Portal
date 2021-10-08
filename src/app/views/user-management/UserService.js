import axios from 'axios';
import http from "../../services/api"

export const getUserById = (id) => {
   return http 
    .get(`/afrimash/users/${id}`)      
}

export const getAllUser = () => {
    return http.get('/afrimash/users/')
}

export const deleteUser = (user) => {
    return http.delete('/afrimash/users/', user)
}
export const addUser = (user) => {
    return http.post('/afrimash/users/', user)
}
export const updateUser = (user) => {
    return http.put(`/afrimash/users/`, user)
}
export const getAllRoles = () =>{
    return http.get('/afrimash/roles/')
}
