import axios from 'axios'
// import * as types from '@/store/types'
// import store from '@/store'

/**
 * config axios variable 
 */
// axios.defaults.baseURL = 'http://19.16.132.53:9000/cmyfm' //import.meta.env.VITE_API_URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_CONTEXT
// axios.defaults.headers.common['Accept-Language'] = JSON.parse(localStorage.getItem('locale')) || 'en'
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common.Accept = 'application/json;charset=UTF-8'

/**
 * request 전처리
 */
axios.interceptors.request.use(
  config => {
    // TODO: show spinner
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * response 전처리
 */
axios.interceptors.response.use(
  response => {
    // TODO: hide spinner
    // TODO: error check
    /*
      if (response.code.error) {
        // errorStore.dispatch()
      }
    */
    // return Promise.reject(error)

    // response.data.body default value 처리
    response.data.body = response.data.body || {}
    return response
  },
  error => {
    // TODO: hide spinner
    // Do something with response error
    return Promise.reject(error)
  }
)

export default Plugin