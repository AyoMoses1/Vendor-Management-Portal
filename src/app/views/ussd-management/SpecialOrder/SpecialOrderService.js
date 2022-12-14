import http from '../../../services/api'

export const getInvoiceById = (id) => {
  return http
    .get(`/afrimash/special-orders/${id}`)
}

export const getAllInvoice = (getOrders, setLoading, page,setCount,source) => {
  setLoading(true)
  return http.get(`afrimash/special-orders?page=${page}&orderSource=${source}`).then(({ data }) => {
    if (data instanceof Object) {
      getOrders(data.object.content)
     setCount(data.object.totalElements);
    }
    setLoading(false)
  })
}

export const deleteInvoice = (order) => {
  return http.delete('/afrimash/special-orders/', order)
}
export const addInvoice = (order) => {
  return http.post('/afrimash/special-orders/', order)
}
export const updateInvoice = (order) => {
  return http.put(`/afrimash/special-orders/`, order)
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
    setAlert('An error occurred while fetching data', err.message)
    setSeverity('error')
  })
}

export const getProductsData = (setLoading, url, setProducts) => {
  setLoading(true)
  http.get(url).then(({ data }) => {
    if (data instanceof Object) {
      setLoading(false)
      setProducts(data.object.content)
    }
  }).catch((err) => {
    setLoading(false)
    console.error(err)
  })
}
