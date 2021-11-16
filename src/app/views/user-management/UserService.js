import http from "../../services/api"
import { errorState } from "../helpers/error-state"

export const getUserById = (id) => {
   return http 
    .get(`/afrimash/users/${id}`)
}

export const getAllUser = (setData, isLoading, setAlert, setSeverity, setCount, page) => {
  isLoading(true)
  http.get(`/afrimash/users/search?page=${page}`).then(({ data }) => {
    setData(data.object.content)
    setCount(data.object.totalElements);
     isLoading(false)
  }).catch((err) => {
      errorState(setAlert, setSeverity)
    })
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
