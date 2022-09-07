import http from "../../services/api"
import { errorState } from "../helpers/error-state"
export const getCustomerById = (id) => {
  return http
    .get(`/afrimash/customers/${id}`)
}
export const getAllCustomer = (setData, setCount, isLoading, setAlert, setSeverity, size, page, source, query, state) => {
  isLoading(true)
  http.get(source ? `/afrimash/customers/search?page=${page}&size=${size}&source=${source}&query=${query}&state=${state}` : `/afrimash/customers/search?page=${page}&size=${size}&query=${query}&state=${state}`).then(({ data }) => {
    if (data instanceof Object) {
      setData(data.object.content);
      console.log(data.object.content, "ayo moses")
      setCount(data.object.totalElements);
      isLoading(false)
    } else {
      errorState(setAlert, setSeverity)
    }
  })
}

export const filterAllCustomer = (setData, setCount, setAlert, setSeverity, size, page, source, query, state) => {
  http.get(source ? `/afrimash/customers/search?page=${page}&size=${size}&source=${source}&query=${query}&state=${state}` : `/afrimash/customers/search?page=${page}&size=${size}&query=${query}&state=${state}`).then(({ data }) => {
    if (data instanceof Object) {
      setData(data.object.content);
      setCount(data.object.totalElements);
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

export const generateAccount = (payload, setLoading) => {
  setLoading(true)
  return http.post('/afrimash/payments/monnify/make-deposit', payload).then((res) => {
    console.log(res)
    return res;
    // if (res.errorCode === 'ENTITY_EXISTS_ERROR') {
    //   isLoading(false)
    //   setSeverity('error')
    //   setAlert('Please check that the email and phone is not associated with another customer')
    //   return false
    // } else if (res.errorCode === 'MISSING_MANDATORY_FIELD(S)') {
    //   isLoading(false)
    //   setSeverity('error')
    //   setAlert('Please check that all required fields are entered')
    //   return false
    // } else if (res.status === 'OK') {
    //   isLoading(false)
    //   return true
    // } else {
    //   isLoading(false)
    //   return false
    // }
  }).catch(err => {
    console.log(err)
    return err;
  })
}

export const sendCustomerNote = (customerId, note, setSending) => {
  setSending(true)
  return http.post(`/afrimash/customer-notes/${customerId}?message=${note}`).then((res) => {
    setSending(false)
    return res;
  }).catch(err => {
    console.log(err)
    setSending(false)
    return err;
  })
}