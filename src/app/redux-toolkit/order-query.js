import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const API_URL = process.env.REACT_APP_BASE_URL

export const orderApi = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/afrimash',
  }),
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => `/orders`
    })
  })
})

export const { UseGetOrdersQuery } = orderApi
