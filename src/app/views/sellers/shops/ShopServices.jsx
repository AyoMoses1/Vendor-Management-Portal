import axios from 'axios';
import http from "../../../services/api"

export const getShopById = (id) => {
   return http 
    .get(`/afrimash/stores/${id}`)      
}

export const getAllShop = () => {
    return http.get('/afrimash/stores/search?')
}

export const deleteShop = (store) => {
    return http.delete('/afrimash/stores/', store)
}
export const addShop = (store) => {
    return http.post('/afrimash/stores/', store)
}
export const updateShop = (store) => {
    return http.put(`/afrimash/stores/`, store)
}
