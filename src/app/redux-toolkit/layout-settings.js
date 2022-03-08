import { configureStore, createSlice, getDefaultMiddleware, PayloadAction } from '@reduxjs/toolkit'

import { MatxLayoutSettings } from "../MatxLayout/settings";

const initialState = {
  settings: {
    ...MatxLayoutSettings
  },
  defaultSettings: {
    ...MatxLayoutSettings
  }
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    layoutSettings: (state, { payload }) => {
      return {
        ...state,
        settings: {...payload}
      }
    },
    defaultSettings: (state, { payload }) => {
      return {
        ...state,
        settings: {...payload }
      }
    }
  }
})

export const {
  layoutSettings: setLayoutSettings,
  defaultSettings: setDefaultSettings
} = layoutSlice.actions

export const layoutReducer = {
  layout: layoutSlice.reducer
}
