import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  USER_LOADED,
  RESET_PASSWORD
} from "../actions/LoginActions";
import localStorageService from "../../services/localStorageService";
import axios from 'axios'
const initialState = {
  success: false,
  loading: false,
  isAuthenticated: false,
  error: {
    username: null,
    password: null
  }
};

const LoginReducer = function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case LOGIN_SUCCESS: {
      localStorage.setItem("jwt_token", action.payload.jwt);
      axios.defaults.headers.common["Authorization"] = "Bearer " + action.payload.jwt;
      return {
        ...state,
        success: true,
        isAuthenticated: true,
        loading: false
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        success: true,
        loading: false
      };
    }
    case LOGIN_ERROR: {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
      return {
        success: false,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    }
    case USER_LOADED: {
      localStorageService.setItem('auth_user',action.payload)
      return {
        ...state,
        isAuthenticated: true,
        success: true,
        loading: false
      }
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
