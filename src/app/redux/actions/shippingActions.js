import http from "../../services/api"


export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST'
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS'
export const CREATE_GROUP_FAILED = 'CREATE_GROUP_FAILED'

export const GET_GROUP_LIST_REQUEST = 'GET_GROUP_LIST_REQUEST'
export const GET_GROUP_LIST_SUCCESS = 'GET_GROUP_LIST_SUCCESS'
export const GET_GROUP_LIST_FAILED = 'GET_GROUP_LIST_FAILED'



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

export const getShippingOptionGroup = () => dispatch => {
  dispatch({ type: GET_GROUP_LIST_REQUEST })


  http.get(`/afrimash/shipping-option-group`, {}).then(
    (res) => {
    dispatch({
      type: GET_GROUP_LIST_SUCCESS,
      payload: res?.data.object
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