import http from "../../../services/api"

export const getShopById = (id) => {
   return http 
    .get(`/afrimash/stores/${id}`)      
}

export const getAllShop = () => {
    return http.get('/afrimash/stores/search?')
}

export const deleteShop = (store) => {
    return http.delete('/afrimash/stores/', store)
}
export const addShop = (store) => {
    return http.post('/afrimash/stores/', store)
}
export const updateShop = (store) => {
    return http.put(`/afrimash/stores/`, store)
}
export const getShops = (id, isLoading, setShops) => {
  isLoading(true)
  http.get('/afrimash/stores/search').then(({ data }) => {
    let { content } = data.object
    if (content instanceof Object) {
      let sellerShop = content.filter((shop) => {
        return shop.sellerId.id === id
      })
      setShops(sellerShop)
      isLoading(false)
    }
  })
}
export const getStoreProducts = (page, size, id) => {
  return http.get(`afrimash/products?search?page=${page}&size=${size}&vendorId=${id}`).then(({ data }) => {
    if (data instanceof Object) {
      return data.object
    }
  })
}
