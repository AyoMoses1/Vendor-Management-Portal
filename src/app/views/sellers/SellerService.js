import http from "../../services/api"

export const getSellerById = (id) => {
  return http
    .get(`/afrimash/sellers/${id}`)
}

export const getSellerOrders = ( id) => {
  return http.get(`https://api.afrimash.com/afrimash/orders/order-items/${id}`)    
  
}

export const getAllSeller = (setLoading, setData, setAlert, setSeverity, state, statusOption) => {

  setLoading(true)
  
  http.get(statusOption === "ALL" ?  (state==="ALL" ? `/afrimash/sellers/search/`: `/afrimash/sellers/search?state=${state}`) : `/afrimash/sellers/search?status=${statusOption}&state=${state}`).then(({ data }) => {
    if (data instanceof Object) {
      setData(data.object.content)
      setLoading(false)
    }
    
  }).catch((err) => {
    setLoading(false)
    setSeverity('error')
    setAlert('Something went wrong with processing your request from the server')
  })
}

export const deleteSeller = (seller) => {
  return http.delete('/afrimash/vendors/', seller)
}
export const addSeller = (seller) => {
  return http.post('/afrimash/sellers/', seller)
}
export const updateSeller = (seller) => {
  return http.put(`/afrimash/sellers/`, seller)
}
