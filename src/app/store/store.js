import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// import { orderApi } from '../redux-toolkit/order-query'

import { orderApi } from '../redux-toolkit/order-query'

import { layoutReducer} from '../redux-toolkit/layout-settings'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [orderApi.reducerPath]: orderApi.reducer,
    layoutReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
