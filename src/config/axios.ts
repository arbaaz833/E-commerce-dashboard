import axiosApi from 'axios'
const axios = axiosApi.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.response.use(async (response) => {
  return response.data
})

export default axios
