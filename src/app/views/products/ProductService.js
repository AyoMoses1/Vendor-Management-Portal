import axios from 'axios';
import http from "../../services/api"

export const getProductById = (id) => {
   return http 
    .get(`/afrimash/products/${id}`)      
}

export const getAllProduct = () => {
    return http.get('/afrimash/products/')
}

export const deleteProduct = (product) => {
    return http.delete('/afrimash/products/', product)
}
export const addProduct = (product) => {
    return http.post('/afrimash/products/', product)
}
export const updateProduct = (product) => {
    return http.put(`/afrimash/products/`, product)
}

export const getProductCategoryById = (id) => {
    return http 
     .get(`/afrimash/product-catergories/${id}`)      
 }
 
 export const getAllProductCategory = () => {
     return http.get('/afrimash/product-catergories/')
 }
 
 export const deleteProductCategory = (product) => {
     return http.delete('/afrimash/product-catergories/', product)
 }
 export const addProductCategory = (product) => {
     return http.post('/afrimash/product-catergories/', product)
 }
 export const updateProductCategory = (product) => {
     return http.put(`/afrimash/product-catergories/`, product)
 }
