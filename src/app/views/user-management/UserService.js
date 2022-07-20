import http from "../../services/api"
import { errorState } from "../helpers/error-state"

export const getUserById = (id) => {
    return http
        .get(`/afrimash/users/${id}`)
}

export const getAllUser = (setData, isLoading, setAlert, setSeverity, setCount, page, size, role) => {
    isLoading(true)
    http.get(role ? `/afrimash/users/search?page=${page}&size=${size}&roleId=${role}` : `/afrimash/users/search?page=${page}&size=${size}`).then(({ data }) => {
        setData(data.object.content)
        setCount(data.object.totalElements);
        isLoading(false)
    }).catch((err) => {
        errorState(setAlert, setSeverity)
    })
}

export const deleteUser = (id, isLoading) => {
    const data = {
        id: id
    }
    isLoading(true);
    return http.delete('/afrimash/users/', { data: { id } }).then(({ data }) => {
        isLoading(false)
    }).catch((err) => {
        isLoading(false)
    })
}
export const addUser = (user) => {
    return http.post('/afrimash/users/', user)
}
export const updateUser = (user) => {
    return http.patch(`/afrimash/users/`, user)
}
export const getAllRoles = () => {
    return http.get('/afrimash/roles/')
}
