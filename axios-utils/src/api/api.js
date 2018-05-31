import axios from './axios.js'

export const getLogin = ({ userName, password }) => {
  const data = {
    username: userName,
    password
  }

  const r = axios.request({
    url: '/login',
    data,
    method: 'post'
  })
  return r
}