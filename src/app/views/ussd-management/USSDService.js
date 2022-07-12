
import http from "../../services/api"

export const addPickupCenter = (data, isLoading, setAlert, setSeverity) => {
    isLoading(true)
    return http.post('/afrimash/pickup-center', data).then((res) => {
        if (res.status === 200) {
            isLoading(false)
            return true
        } else {
            isLoading(false)
            setSeverity('error')
            setAlert('Please check that all required fields are entered')
            return false
        }
    })
}

export const deletePickupCenter = (id, isLoading, setAlert, setSeverity) => {
    isLoading(true)
    return http.delete('/afrimash/pickup-center/' + id).then((res) => {
        if (res.status === 200) {
            isLoading(false)
            return true
        } else {
            isLoading(false)
            setSeverity('error')
            setAlert('Please check that all required fields are entered')
            return false
        }
    })
}

export const updatePickupCenter = (data, isLoading, setAlert, setSeverity) => {
    isLoading(true)
    return http.put('/afrimash/pickup-center', data).then((res) => {
        if (res.status === 200) {
            isLoading(false)
            return true
        } else {
            isLoading(false)
            setSeverity('error')
            setAlert('Please check that all required fields are entered')
            return false
        }
    })
}

export const getPickupCenter = (id, isLoading, setAlert, setSeverity) => {
    isLoading(true)
    return http.get('/afrimash/pickup-center/' + id).then((res) => {
        if (res.status === 200) {
            isLoading(false)
            return res?.data?.object;
        } else {
            isLoading(false)
            setSeverity('error')
            setAlert('Please check that all required fields are entered')
            return false
        }
    })
}

export const getSpecialOrder = (id, isLoading, setAlert, setSeverity) => {
    isLoading(true)
    return http.get('/special-orders/' + id).then((res) => {
        if (res.status === 200) {
            isLoading(false)
            return res?.data?.object;
        } else {
            isLoading(false)
            setSeverity('error')
            setAlert('Please check that all required fields are entered')
            return false
        }
    })
}

export const updateSpecialOrder = (data, isLoading, setAlert, setSeverity) => {
    isLoading(true)
    return http.put('/special-orders', data).then((res) => {
        if (res.status === 200) {
            isLoading(false)
            return true
        } else {
            isLoading(false)
            setSeverity('error')
            setAlert('Please check that all required fields are entered')
            return false
        }
    })
}
