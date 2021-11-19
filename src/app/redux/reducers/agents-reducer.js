import {
  GET_AGENT_REQUEST, GET_ALL_AGENTS_SUCCESS,
  ERROR_FETCH_AGENT, GET_AGENT_DETAILS_REQUEST,
  GET_AGENT_DETAILS_SUCCESS,
  ERROR_FETCH_DETILS_AGENT,
  GET_AGENT_CUSTOMER_SUCCESS
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
        loading: true,
      }
    case GET_ALL_AGENTS_SUCCESS:
      return {
        ...state,
        agentList: action.payload.content,
        count: action.payload.numberOfElements,
        loading: false,
      }
    case ERROR_FETCH_AGENT:
      return {
        ...state,
        error: action.payload,
        severity: 'error'
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
