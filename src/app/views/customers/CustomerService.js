
import http from "../../services/api"
import { errorState } from "../helpers/error-state"

export const getCustomerById = (id) => {
  return http
    .get(`/afrimash/customers/${id}`)
}

export const getAllCustomer = (setData, isLoading, setAlert, setSeverity) => {
  isLoading(true)
   http.get('/afrimash/customers/search?source=ADMIN').then(({data}) => {
    if (data instanceof Object) {
      setData(data.object.content)
      isLoading(false)
    } else {
      errorState(setAlert, setSeverity)
    }
  })
}

export const deleteCustomer = (customer) => {
  return http.delete('/afrimash/customers', customer)
}
export const addCustomer = (customer, setData, isLoading, setAlert, setSeverity) => {
  isLoading(true)
  return http.post('/afrimash/customers', customer).then((res) => {
    if (res.errorCode === 'ENTITY_EXISTS_ERROR') {
      isLoading(false)
      setSeverity('error')
      setAlert('Please check that the email and phone is not associated with another customer')
      return false
    } else if (res.errorCode === 'MISSING_MANDATORY_FIELD(S)') {
      isLoading(false)
      setSeverity('error')
      setAlert('Please check that all required fields are entered')
      return false
    } else if (res.status === 'OK') {
      isLoading(false)
     return true
    } else {
      isLoading(false)
      return false
    }
  })
}
export const updateCustomer = (customer) => {
  return http.put(`/afrimash/customers/`, customer)
}
