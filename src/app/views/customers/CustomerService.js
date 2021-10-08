import axios from 'axios';
import http from "../../services/api"

export const getCustomerById = (id) => {
   return http 
    .get(`/afrimash/customers/${id}`)      
}

export const getAllCustomer = () => {
    return http.get('/afrimash/customers/')
}

export const deleteCustomer = (customer) => {
    return http.delete('/afrimash/customers/', customer)
}
export const addCustomer = (customer) => {
    return http.post('/afrimash/customers/', customer)
}
export const updateCustomer = (customer) => {
    return http.put(`/afrimash/customers/`, customer)
}
