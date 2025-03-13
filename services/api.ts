import axios from "axios"
import { getAuth } from "firebase/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    const auth = getAuth()
    const user = auth.currentUser

    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api

