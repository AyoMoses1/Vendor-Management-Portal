import { CREATE_GROUP_FAILED, CREATE_GROUP_REQUEST, CREATE_GROUP_SUCCESS, GET_GROUP_LIST_FAILED, GET_GROUP_LIST_REQUEST, GET_GROUP_LIST_SUCCESS } from "../actions/shippingActions"









export const shippingGroupCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_GROUP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        shipping: action.payload,
        loading: false,
      }
    case CREATE_GROUP_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

const initialState = {
  shipping: [],
  loading: false,
  error: null
}
export const shippingGroupListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_LIST_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_GROUP_LIST_SUCCESS:
      return {
        ...state,
        shipping: action.payload,
        loading: false,
      }
    case GET_GROUP_LIST_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
