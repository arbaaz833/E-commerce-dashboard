import axiosApi from 'axios'
const axios = axiosApi.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.response.use(async (response) => {
  return response.data
})

export default axios
