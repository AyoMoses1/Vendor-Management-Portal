import {
  GET_AGENT_REQUEST, GET_ALL_AGENTS_SUCCESS,
  ERROR_FETCH_AGENT, GET_AGENT_DETAILS_REQUEST,
  GET_AGENT_DETAILS_SUCCESS,
  ERROR_FETCH_DETILS_AGENT,
  GET_AGENT_CUSTOMER_SUCCESS,
  AGENT_ORDERS_REQUEST,
  AGENT_ORDERS_SUCCESS,
  AGENT_ORDERS_FAILED,
  CREATE_AGENT_REQUEST,
  CREATE_AGENT_SUCCESS,
  CREATE_AGENT_FAILED,
  GET_ALL_AGENT_APPLICATION,
  GET_ALL_AGENT_APPLICATION_SUCCESS,
  GET_ALL_AGENT_APPLICATION_FAILED,
  APPROVE_AGENT_APPLICATION,
  APPROVE_AGENT_APPLICATION_SUCCESS,
  APPROVE_AGENT_APPLICATION_FAILED,
  DELETE_AGENT,
  DELETE_AGENT_FAILED,
  DELETE_AGENT_SUCCESS,
  TRANSFER_CUSTOMERS,
  TRANSFER_CUSTOMERS_FAILED,
  TRANSFER_CUSTOMERS_SUCCESS
} from '../actions/agents-action'

const initialState = {
  agentList: [],
  error: null,
  loading: false,
  severity: '',
  count: 0,
};

export const agentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_ALL_AGENTS_SUCCESS:
      return {
        ...state,
        agentList: action.payload.content,
        total: action.payload.totalElements,
        loading: false,
        pages: action.payload.totalPages,
        page: action.payload.pageable.pageNumber,
        size: action.payload.size
      }
    case ERROR_FETCH_AGENT:
      return {
        ...state,
        error: action.payload,
        severity: 'error',
        loading: false
      }
    default:
      return state
  }
}

export const agentDetailsReducer = (state = { agentDetails: [], loading: false }, action) => {
  switch (action.type) {
    case GET_AGENT_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case GET_AGENT_DETAILS_SUCCESS:
      return {
        ...state,
        agentDetails: action.payload,
        loading: false,
      }
    case ERROR_FETCH_DETILS_AGENT:
      return {
        ...state,
        error: action.payload,
        severity: 'error'
      }
    default:
      return state
  }
}

export const agentCustomersReducer = (state = { agentCustomers: [], loading: true }, action) => {
  switch (action.type) {
    case GET_AGENT_CUSTOMER_SUCCESS:
      return {
        ...state,
        agentCustomers: action.payload
      }
    default:
      return state
  }
}

export const agentOrdersReducer = (state = { agentOrders: [], loading: false, count: 0 }, action) => {
  switch (action.type) {
    case AGENT_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case AGENT_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        agentOrders: action.payload.content,
        count: action.payload.totalElements
      }
    case AGENT_ORDERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export const createAgentReducer = (state = { response: [], loading: false }, action) => {
  switch (action.type) {
    case CREATE_AGENT_REQUEST:
      return {
        ...state,
        loading: true
      }
    case CREATE_AGENT_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      }
    case CREATE_AGENT_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      }
      default:
      return state
  }
}

export const agentApplicationReducer = (state = {content: [], pageNumber:0, pageSize: 0, offset:0, loading: false}, action) => {
  switch(action.type){
    case GET_ALL_AGENT_APPLICATION: 
    return {
      ...state,
      loading: true
    }
    case GET_ALL_AGENT_APPLICATION_SUCCESS: 
    return {
      ...state,
      content: action.payload.content,
      loading: false,
      pageNumber: action.payload?.pageable?.pageNumber,
      pageSize: action.payload?.pageable?.pageSize,
      offset: action.payload?.pageable?.offset,

    }
    case GET_ALL_AGENT_APPLICATION_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      }
      default:
      return state
  }
}

export const agentApprovalReducer = (state = {loading: false, showSnackBar: false}, {type, payload}) => {
  switch(type){
    case APPROVE_AGENT_APPLICATION:
      return {
        ...state,
        loading: true,
        showSnackBar: false
      }
    case APPROVE_AGENT_APPLICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        showSnackBar: true
      }
    case APPROVE_AGENT_APPLICATION_FAILED:
      return {
        ...state,
        loading: false,
        showSnackBar: true
      }
      default:
      return state
  }
}

export const deleteAgentReducer = (state={loading: false, errMsg:'', data:''}, {type, payload}) => {
  switch(type){
    case DELETE_AGENT: 
    return {
      ...state,
      loading: true
    }
    case DELETE_AGENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      }
    case DELETE_AGENT_FAILED:
      return {
        ...state,
        loading: false,
        errMsg: payload
      }
      default:
        return state
  }
}

export const transferCustomerReducer = (state={loading: false}, {type, payload}) => {
  switch(type){
    case TRANSFER_CUSTOMERS:
      return {
        ...state,
        loading: true
      }
    case TRANSFER_CUSTOMERS_SUCCESS:
    case TRANSFER_CUSTOMERS_FAILED:
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
}
