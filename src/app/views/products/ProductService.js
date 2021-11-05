import http from "../../services/api"
import { errorState } from "../helpers/error-state"

export const getProductById = (id) => {
  return http
    .get(`/afrimash/products/${id}`)
}

export const getAllResults = (setResults, setLoading, url) => {
  setLoading(true)
  return http.get(url).then(({ data }) => {
    if (data instanceof Object) {
      setResults(data.object)
      setLoading(false)
    }
  })
}
export const createProduct = (payload) => {
  return http.post('/afrimash/products/', payload)
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

export const getData = (url, setData, setAlert, setSeverity) => {
  http.get(url).then(({data}) => {
    setData(data.object)
  }).catch((err) => {
    errorState(setAlert, setSeverity)
  })
}

export const getBrands = (setAlert, setSeverity, setBrands) => {
  http
    .get(`/afrimash/brands/`)
    .then(({data}) => {
      setBrands(data)
    })
    .catch((err) => {
      errorState(setAlert, setSeverity)
    })
}
