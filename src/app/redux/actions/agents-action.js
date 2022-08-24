import http from "../../services/api"
import routes from '../routes';

export const GET_ALL_AGENTS_SUCCESS = "GET_ALL_AGENTS_SUCCESS";

export const GET_AGENT_REQUEST = "GET_AGENT_REQUEST";
export const ERROR_FETCH_AGENT = "ERROR_FETCH_ORDER";

export const GET_AGENT_DETAILS_REQUEST = "GET_AGENT_DETAILS_REQUEST";
export const GET_AGENT_DETAILS_SUCCESS = "GET_AGENT_DETAILS_SUCCESS";
export const ERROR_FETCH_DETILS_AGENT = "ERROR_FETCH_DETILS_AGENT";

export const GET_AGENT_CUSTOMER_SUCCESS = "GET_AGENT_CUSTOMER_SUCCESS";
export const GET_AGENT_CUSTOMER_FAILED = "GET_AGENT_CUSTOMER_FAILED";

export const AGENT_ORDERS_REQUEST = 'AGENT_ORDERS_REQUEST'
export const AGENT_ORDERS_SUCCESS = 'AGENT_ORDERS_SUCCESS'
export const AGENT_ORDERS_FAILED = 'AGENT_ORDERS_FAILED'

export const CREATE_AGENT_REQUEST = 'CREATE_AGENT_REQUEST'
export const CREATE_AGENT_SUCCESS = 'CREATE_AGENT_SUCCESS'
export const CREATE_AGENT_FAILED = 'CREATE_AGENT_FAILED'


export const UPDATE_AGENT_REQUEST = 'UPDATE_AGENT_REQUEST'
export const UPDATE_AGENT_SUCCESS = 'UPDATE_AGENT_SUCCESS'
export const UPDATE_AGENT_FAILED = 'UPDATE_AGENT_FAILED'


export const GET_ALL_AGENT_APPLICATION = 'GET_ALL_AGENT_APPLICATION';
export const GET_ALL_AGENT_APPLICATION_SUCCESS = 'GET_ALL_AGENT_APPLICATION_SUCCESS';
export const GET_ALL_AGENT_APPLICATION_FAILED = 'GET_ALL_AGENT_APPLICATION_FAILED';

export const APPROVE_AGENT_APPLICATION = 'APPROVE_AGENT_APPLICATION';
export const APPROVE_AGENT_APPLICATION_SUCCESS = 'APPROVE_AGENT_APPLICATION_SUCCESS';
export const APPROVE_AGENT_APPLICATION_FAILED = 'APPROVE_AGENT_APPLICATION_FAILED';

export const DELETE_AGENT = 'DELETE_AGENT';
export const DELETE_AGENT_SUCCESS = 'DELETE_AGENT_SUCCESS';
export const DELETE_AGENT_FAILED = 'DELETE_AGENT_FAILED';

export const TRANSFER_CUSTOMERS = "TRANSFER_CUSTOMERS";
export const TRANSFER_CUSTOMERS_SUCCESS = "TRANSFER_CUSTOMERS_SUCCESS";
export const TRANSFER_CUSTOMERS_FAILED = "TRANSFER_CUSTOMERS_FAILED";

export const getAllAgents = ({ page = '', size = '', query = '' }) => dispatch => {
  dispatch({ type: GET_AGENT_REQUEST })
  http.get(`/afrimash/agents/search?size=${size}&page=${page}&query=${query}`).then(({ data }) => {
    dispatch({
      type: GET_ALL_AGENTS_SUCCESS,
      payload: data.object,
    })
  }).catch((err) => { dispatch({ type: ERROR_FETCH_AGENT, payload: err }) })
}

export const getAgentById = (id) => dispatch => {
  dispatch({ type: GET_AGENT_DETAILS_REQUEST })
  http.get(`/afrimash/agents/${id}`).then(({ data }) => {
    dispatch({
      type: GET_AGENT_DETAILS_SUCCESS,
      payload: data?.object,
    })
  }).catch((err) => {
    dispatch({ type: ERROR_FETCH_DETILS_AGENT, payload: err })
  })
}
export const getAllAgentsApplications = () => dispatch => {
  dispatch({ type: GET_ALL_AGENT_APPLICATION });
  http.get(routes.agentApplicationRoute).then(({ data }) => {
    dispatch({
      type: GET_ALL_AGENT_APPLICATION_SUCCESS,
      payload: data.object,
    })
  }).catch((err) => {
    dispatch({ type: GET_ALL_AGENT_APPLICATION_FAILED, payload: err })
  })
}

export const approveAgentApplication = (payload) => dispatch => {
  dispatch({ type: APPROVE_AGENT_APPLICATION });
  http.post(`${routes.approveApplicationRoute}/${payload.applicationId}`).then(({ data }) => {
    dispatch({
      type: APPROVE_AGENT_APPLICATION_SUCCESS,
    })
  }).catch((err) => {
    dispatch({ type: APPROVE_AGENT_APPLICATION_FAILED, payload: err })
  })
}
export const getAgentCustomers = (agentCode) => dispatch => {
  http.get(`/afrimash/customers?agentCode=${agentCode}`).then(({ data }) => {
    dispatch({
      type: GET_AGENT_CUSTOMER_SUCCESS,
      payload: data.object
    })
  }).catch((err) => { dispatch({ type: GET_AGENT_CUSTOMER_FAILED, payload: err }) })
}

export const getAgentOrders = (agentId, page = 0) => dispatch => {
  dispatch({ type: AGENT_ORDERS_REQUEST })
  http.get(`/afrimash/orders?agentId=${agentId}&page=${page}`).then(({ data }) => {
    dispatch({
      type: AGENT_ORDERS_SUCCESS,
      payload: data.object
    })
  }).catch((err) => { dispatch({ type: AGENT_ORDERS_FAILED, payload: err }) })
}

export const createAgent = (formData) => dispatch => {
  dispatch({ type: CREATE_AGENT_REQUEST })
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  http.post(`/afrimash/agents`, formData, config).then((res) => {
    dispatch({
      type: CREATE_AGENT_SUCCESS,
      payload: res
    })
  })

}

export const updateAgent = (updateData) => dispatch => {
  dispatch({ type: UPDATE_AGENT_REQUEST })
  http.post(`/afrimash/agents`, updateData).then((res) => {
    if (res.status === 200) {
      dispatch({
        type: UPDATE_AGENT_SUCCESS,
        payload: res
      })
    } else if (res.status === 'BAD_REQUEST') {
      dispatch({
        type: UPDATE_AGENT_FAILED,
        payload: res
      })
    }
  })
}


export const deleteAgent = (agentId) => async dispatch => {
  try {
    dispatch({ type: DELETE_AGENT })

    const response = await http.delete(routes.deleteAgentRoute(agentId));

    dispatch({ type: DELETE_AGENT_SUCCESS, payload: response })
  } catch (error) {
    dispatch({ type: DELETE_AGENT_FAILED, payload: error?.response?.data?.errorMsg })
  }

}

export const transferCustomer = (payload) => async dispatch => {
  try {
    dispatch({ type: TRANSFER_CUSTOMERS })

    const response = await http.patch(routes.transferCustomer(payload.sourceAgentId, payload.reciepientAgentId));
    deleteAgent(payload.sourceAgentId);
    dispatch({ type: TRANSFER_CUSTOMERS_SUCCESS, payload: response })
  } catch (error) {
    dispatch({ type: TRANSFER_CUSTOMERS_FAILED, payload: error?.response?.data?.errorMsg })
  }

}
