import axios from 'axios';
import http from "../../services/api"

export const getSellerById = (id) => {
   return http 
    .get(`/afrimash/sellers/${id}`)      
}

export const getAllSeller = () => {
    return http.get('/afrimash/sellers/')
}

export const deleteSeller = (seller) => {
    return http.delete('/afrimash/sellers/', seller)
}
export const addSeller = (seller) => {
    return http.post('/afrimash/sellers/', seller)
}
export const updateSeller = (seller) => {
    return http.put(`/afrimash/sellers/`, seller)
}
