
import http from "../../services/api"

export const getInvoiceById = (id) => {
  return http
    .get(`/afrimash/orders/${id}`)
}

export const getAllInvoice = (getOrders, setLoading) => {
  setLoading(true)
  return http.get('/afrimash/orders?size=100').then(({ data }) => {
    if (data instanceof Object) getOrders(data.object.content)
    setLoading(false)
  })
}

export const deleteInvoice = (order) => {
  return http.delete('/afrimash/orders/', order)
}
export const addInvoice = (order) => {
  return http.post('/afrimash/orders/', order)
}
export const updateInvoice = (order) => {
  return http.put(`/afrimash/orders/`, order)
}

export const populate = (setCustomers, setAlert, setSeverity, url, setLoading) => {
  if (!url) return
  setLoading(true)
  http.get(url).then(({data}) => {
    if (data instanceof Object) {
        setLoading(false)
        setSeverity('success')
        setCustomers(data.object)
    }
  }).catch((err) => {
    setAlert('Ann error occurred while fetching data', err.message)
    setSeverity('error')
  })
}
