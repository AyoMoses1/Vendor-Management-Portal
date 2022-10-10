import http from "../../services/api";

const download = (data) => {
  const url = window.URL.createObjectURL(new Blob([data], { type: "application/pdf" }));
  var link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'invoice.pdf');
  document.body.appendChild(link);
  link.click();
}

export const getInvoiceById = (id) => {
  return http
    .get(`/afrimash/orders/${id}`)
}

export const getAllInvoice = (setLoading, page, size, _source, query) => {
  return http.get(_source ? `afrimash/orders?page=${page}&size=${size}&orderSource=${_source}&query=${query}` : `afrimash/orders?page=${page}&size=${size}&query=${query}`).then(({ data }) => {
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
  return http.get(`/afrimash/reporting/order-stats`).then(({ data }) => {
    if (data instanceof Object) {
      setLoading(false)
      return data.object
    }
  }).catch((err) => {
    setLoading(false)
    console.log(err)
  })
}

export const downloadPdfInvoice = (orderId, setDownloading) => {
  setDownloading(true)
  return http.getDoc(`/afrimash/orders/${orderId}/pdf-invoice`).then(({ data }) => {
    download(data);
    setDownloading(false)
    return data
  }).catch((err) => {
    setDownloading(false)
    console.log(err)
  })
}

export const downloadParkingSlip = (orderId, setDownloading) => {
  setDownloading(true)
  return http.getDoc(`/afrimash/orders/${orderId}/parking-slip`).then(({ data }) => {
    download(data);
    setDownloading(false)
    return data
  }).catch((err) => {
    setDownloading(false)
    console.log(err)
  })
}

export const addDeliveryAddress = (address) => {
  return http.post(`/afrimash/delivery-addresses`, address)
}
