import FirebaseAuthService from "../../services/firebase/firebaseAuthService";
import { setUserData } from "./UserActions";
import history from "history.js";

import axios from "axios";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const USER_LOADED = 'USER_LOADED'
export const AUTH_ERROR = 'AUTH_ERROR'
export const ENTER_PASSWORD = "ENTER_PASSWORD";


export const loadUser = () => dispatch => {
  axios.get("/afrimash/users/logged-in-details").then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data.object);
        dispatch({
          type: USER_LOADED,
          payload: response.data.object
        })
        history.push('/dashboard/analytics')
      } else if (response.data.errorMsg !== null) {
        
        dispatch({
          type: AUTH_ERROR,
        })
      }
    }
  )
};

export function loginWithEmailAndPassword(state){
  const API_URL = process.env.REACT_APP_BASE_URL
  const userlog = state
  return dispatch => {
    dispatch({
      type: LOGIN_LOADING
    });
    axios.post(API_URL + '/afrimash/authenticate', userlog).then(
      response => {
        if (response.status === 200) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
          })
          axios.get(API_URL + "/afrimash/users/logged-in-details").then(
            (response) => {
              if (response.status === 200) {
                dispatch({
                  type: USER_LOADED,
                  payload: response.data.object
                })
                history.push('/dashboard/analytics')
              } else if (response.data.errorMsg !== null) {
                dispatch({
                  type: AUTH_ERROR,
                })
              }
            }
          )
        }
      }, error => {
        if (error.response.data !== null) {
          dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data
          })
        }
      }
    )

    // jwtAuthService
    //   .loginWithEmailAndPassword(userlog)
    //   .then(user => {
    //     dispatch(setUserData(user));
    //     history.push({
    //       pathname: "/dashboard/analytics"
    //     });
    //     return dispatch({
    //       type: LOGIN_SUCCESS
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error.data.response);
    //     return dispatch({
    //       type: LOGIN_ERROR,
    //       payload: error
    //     });
    //   });
  };
}

export function resetPassword({ email }) {
  return dispatch => {
    dispatch({
      payload: email,
      type: RESET_PASSWORD
    });
  };
}


export function enterPassword({ otp, password }) {
  axios.put_new(`/afrimash/users/password/confirm/${otp}`).then(
    (response) => {
      if (response.status === 200) {
        console.log(response.data.object);
        
      }
    }
  )
};







export function firebaseLoginEmailPassword({ email, password }) {
  return dispatch => {
    FirebaseAuthService.signInWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          dispatch(
            setUserData({
              userId: "1",
              role: "ADMIN",
              displayName: "Watson Joyce",
              email: "watsonjoyce@gmail.com",
              photoURL: "/assets/images/face-7.jpg",
              age: 25,
              token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
              ...user
            })
          );

          history.push({
            pathname: "/"
          });

          return dispatch({
            type: LOGIN_SUCCESS
          });
        } else {
          return dispatch({
            type: LOGIN_ERROR,
            payload: "Login Failed"
          });
        }
      })
      .catch(error => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error
        });
      });
  };
}
