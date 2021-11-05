import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.afrimash.com/afrimash',
  }),
  endpoints: (builder) =>( {
    getAllOrders: builder.query({
      query: () => `/orders`
    })
  })
})

export const {UseGetOrdersQuery} = orderApi
