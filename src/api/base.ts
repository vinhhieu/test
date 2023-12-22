import axios from 'axios'
import { AUTH_TOKEN, BASE_API_URL } from 'constant'
import Cookies from 'js-cookie'

axios.defaults.baseURL = `${BASE_API_URL}/`
axios.defaults.withCredentials = false

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (Cookies.get(AUTH_TOKEN)) {
      config.headers.Authorization = `Bearer ${Cookies.get(AUTH_TOKEN)}`
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const errorData = error?.response?.data
    return Promise.reject(errorData || error)
  },
)

export default axios
