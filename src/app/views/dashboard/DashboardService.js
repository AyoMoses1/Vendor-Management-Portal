
import http from "../../services/api"
import { errorState } from "../helpers/error-state"

export const getUserStatistics = (setStatistics) => {
  http.get(`/afrimash/dashboard/user-stats`).then(({ data }) => {
    if (data instanceof Object) {
      setStatistics(data.object);
    }
  })
}

export const getCustomerStatistics = (setStatistics) => {
  http.get(`/afrimash/dashboard/customer-stats-by-source`).then(({ data }) => {
    if (data instanceof Object) {
      setStatistics(data.object);
    }
  })
}