import axios from "axios";
import localStorageService from "../services/localStorageService";
import http from "./api";
import history from "history.js";
const API_URL = process.env.REACT_APP_BASE_URL


class JwtAuthService {

  loginWithEmailAndPassword = (userlog) => {
    axios.post(`${API_URL}/afrimash/authenticate`, userlog)
      .then(
        response => {
          if (response.status === 200) {
            const { jwt } = response.data
            this.setSession(jwt)
            http
              .get("/afrimash/users/logged-in-details")
              .then((response) => {
                if (response.status === 200) {
                  history.push("/dashboard/analytics")
                  this.setUser(response.data.object)
                  return this.user
                } else if (response.data.errorMsg != null) {
                  return
                }
              })
          }
        },
        error => {
          if (error) return
        }
      )
  }


  logout = () => {
    this.setSession(null);
    this.removeUser();
  }

  // Set token to all http request header, so you don't need to attach everytime
  setSession = token => {
    if (token) {
      localStorage.setItem("jwt_token", token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      localStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  // Save user to localstorage
  setUser = (user) => {
    localStorageService.setItem("auth_user", user);
  }
  // setError = (err) => {

  // }
  // Remove user from localstorage
  removeUser = () => {
    localStorage.removeItem("auth_user");
  }
}

export default new JwtAuthService();
