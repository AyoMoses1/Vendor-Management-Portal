import http from "../../services/api"

export const getInvoiceById = (id) => {
  return http
    .get(`/afrimash/orders/${id}`)
}


export const getAllInvoice = (setLoading, page, _source) => {
  
  return http.get(_source ? `afrimash/orders?page=${page}&orderSource=${_source}` : `afrimash/orders?page=${page}`).then(({ data }) => {
    if (data instanceof Object) {
      return data.object
    }
  })


}

export const deleteInvoice = (order) => {
  return http.delete('/afrimash/orders/', order)
}
export const addInvoice = (order) => {
  return http.post('/afrimash/orders/', order)
}
export const updateInvoice = (order) => {
  return http.patch(`/afrimash/orders/`, order)
}

export const populate = (setCustomers, setAlert, setSeverity, url, setLoading) => {
  if (!url) return
  setLoading(true)
  http.get(url).then(({ data }) => {
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

export const deleteOrderItem = (orderId, itemId, setLoading) => {
  setLoading(true);
  return http.delete(`/afrimash/orders/${orderId}/order-items/${itemId}`).then(({ data }) => {
    setLoading(false)
  }).catch((err) => {
    setLoading(false)
  })
}

export const getOrderStatus = (setLoading) => {
  setLoading(true)
  return http.get(`/afrimash/reporting/order-stats`).then(({data}) => {
    if(data instanceof Object){
      setLoading(false)
      return data.object
    }
  }).catch((err) => {
    setLoading(false)
    console.log(err)
  })
}
