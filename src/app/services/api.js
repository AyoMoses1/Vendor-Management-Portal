import Axios from "axios"
export default new (class Http {
  API_URL = process.env.REACT_APP_BASE_URL
  AxiosSetup = () => {
    const token = localStorage.getItem("jwt_token")
    const axiosInstance = Axios.create({
      baseURL: this.API_URL,
      timeout: 40000
    })
    axiosInstance.defaults.headers.common.Authorization = "Bearer " + token;
    axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
         return Promise.reject(error)
      }
    )
    return axiosInstance
  }

  post = async (urlpath, data, config) => {
    try {
      const response = await this.AxiosSetup().post(urlpath, data, config)
      return response
    } catch (error) {
      if(error.response){
        return error.response.data;
      }else {
        return error;
      }
    }
  }

  post_new = async (urlpath, data, config) => {
      return await this.AxiosSetup().post(urlpath, data, config);
  }

  put = async (urlpath, data, config) => {
    try {
      const response = await this.AxiosSetup().put(urlpath, data, config)
      return response
    } catch (error) {
      let err
      err = error.response.data
      return err
    }
  }

  get = async (urlpath) => {
    const url = `${urlpath}`
    try {
      const response = await this.AxiosSetup().get(url)
      if (
        response.data.errorMsg !== null
      ) {
        // localStorage.removeItem("jwt_token")
        // window.location.reload()
      }
      return response
    } catch (err) {
      return err
    }
  }

  patch = async (urlpath, data) => {
    try {
      const response = await this.AxiosSetup().patch(urlpath, data)
      return response
    } catch (error) {
      let err
      err = error.response.data
      return err
    }
  }

  delete = async (urlpath, data) => {
    try {
      const response = await this.AxiosSetup().delete(urlpath, data)
      if (
        response.data.errorMsg !== null
      ) {
        // localStorage.removeItem("jwt_token")
        // window.location.reload()
      }
      return response
    } catch (err) {
      return err
    }
  }

  delete_new = async (urlpath) => {
    return await this.AxiosSetup().delete(urlpath);
}
})()
