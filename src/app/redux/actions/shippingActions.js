import http from "../../services/api"


export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST'
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_FAILED = 'CREATE_GROUP_FAILED'
export const CREATE_GROUP_RESET = 'CREATE_GROUP_RESET'

export const GET_GROUP_LIST_REQUEST = 'GET_GROUP_LIST_REQUEST'
export const GET_GROUP_LIST_SUCCESS = 'GET_GROUP_LIST_SUCCESS'
export const GET_GROUP_LIST_FAILED = 'GET_GROUP_LIST_FAILED'

export const UPDATE_GROUP_LIST_REQUEST = 'UPDATE_GROUP_LIST_REQUEST'
export const UPDATE_GROUP_LIST_SUCCESS = 'UPDATE_GROUP_LIST_SUCCESS'
export const UPDATE_GROUP_LIST_FAILED = 'UPDATE_GROUP_LIST_FAILED'



export const addShippingGroup = (values) => dispatch => {
  dispatch({ type: CREATE_GROUP_REQUEST, payload: values })

  http.post_new(`/afrimash/shipping-option-group`, values).then(
    (res) => {
    dispatch({
      type: CREATE_GROUP_SUCCESS,
      payload: res.data.object

    })
  },
  e =>{
    console.log(e);
    dispatch({
      type: CREATE_GROUP_FAILED,
      payload: e 
    })
  }
  )
}


export const updateShippingGroup = (values) => dispatch => {
  dispatch({ type: UPDATE_GROUP_LIST_REQUEST, payload: values })

  http.put(`/afrimash/shipping-option-group`, values).then(
    (res) => {
    dispatch({
      type: UPDATE_GROUP_LIST_SUCCESS,
      payload: res.data.object

    })
  },
  e =>{
    console.log(e);
    dispatch({
      type: UPDATE_GROUP_LIST_FAILED,
      payload: e 
    })
  }
  )
}

export const getShippingOptionGroup = () => dispatch => {
  dispatch({ type: GET_GROUP_LIST_REQUEST })


  http.get(`/afrimash/shipping-option-group`, {}).then(
    (res) => {
    dispatch({
      type: GET_GROUP_LIST_SUCCESS,
      payload: res?.data.object.reverse()
    })
  },
  err => {
      dispatch({
        type: GET_GROUP_LIST_FAILED,
        payload: err
      })
  }
  )
}