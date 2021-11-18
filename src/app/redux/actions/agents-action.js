import http from "../../services/api"

export const GET_ALL_AGENTS_SUCCESS = "GET_ALL_AGENTS_SUCCESS";

export const GET_AGENT_REQUEST = "GET_AGENT_REQUEST";
export const ERROR_FETCH_AGENT = "ERROR_FETCH_ORDER";

export const GET_AGENT_DETAILS_REQUEST = "GET_AGENT_DETAILS_REQUEST";
export const GET_AGENT_DETAILS_SUCCESS= "GET_AGENT_DETAILS_SUCCESS";
export const ERROR_FETCH_DETILS_AGENT = "ERROR_FETCH_DETILS_AGENT";

export const getAllAgents = (search = '', size = '',page = '') => dispatch => {
  dispatch({ type: GET_AGENT_REQUEST })
  http.get(`/afrimash/agents/search?=${search}&size=${size}&page=${page}`).then(({ data }) => {
    dispatch({
      type: GET_ALL_AGENTS_SUCCESS,
      payload: data.object,
    })
  }).catch((err) => { dispatch({ type: ERROR_FETCH_AGENT, payload: err }) })
}

export const getAgentById = (id) => dispatch => {
  console.log(id,'agent request');
  dispatch({ type: GET_AGENT_DETAILS_REQUEST })
  http.get(`/afrimash/agents/${id}`).then(({data}) => {
    dispatch({
      type: GET_AGENT_DETAILS_SUCCESS,
      payload: data.object,
    })
  }).catch((err) => { dispatch({ type: ERROR_FETCH_DETILS_AGENT, payload: err }) })
}
