import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'quasar'

let jsph = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com/' })
jsph.interceptors.request.use(config => {
  Loading.show()
  return config
})
jsph.interceptors.response.use(response => {
  Loading.hide()
  return response
}, err => {
  Loading.hide()
  return Promise.reject(err)
})

let films = axios.create({ baseURL: 'https://api.themoviedb.org/3/discover/movie?api_key=382fdc20a456036a67a5e56974cb5016&page=1' })
// let poster = axios.create({ baseURL: 'https://image.tmdb.org/t/p/' })
films.interceptors.request.use(config => {
  Loading.show()
  return config
})
films.interceptors.response.use(response => {
  Loading.hide()
  return response
}, err => {
  Loading.hide()
  return Promise.reject(err)
})

Object.defineProperty(Vue.prototype, '$http', {
  get () {
    return {
      jsph,
      films
    }
  }
})
