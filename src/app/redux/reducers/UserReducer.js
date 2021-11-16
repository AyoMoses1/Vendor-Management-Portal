import {
 
  REMOVE_USER_DATA,
  USER_LOGGED_OUT
} from "../actions/UserActions";
import localStorageService from "../../services/localStorageService";


import { USER_LOADED} from '../actions/LoginActions'

const initialState = {};

const userReducer = function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED: {
      localStorageService.setItem('auth_user', action.payload)
      return {
        ...state,
        ...action.payload
      };
    }
    case REMOVE_USER_DATA: {
      return {
        ...state
      };
    }
    case USER_LOGGED_OUT: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
