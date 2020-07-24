import axios from 'axios'

const API_HOST = process.env.API_HOST || 'localhost'
const API_PORT = process.env.API_PORT || 1235

const instance = axios.create({
  baseURL: `http://${API_HOST}:${API_PORT}`
})

export default instance
