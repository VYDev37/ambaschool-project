import axios, { type AxiosInstance } from 'axios'

const BASE_URL: string = (import.meta.env.VITE_DATA_BASE_URL as string) || '/data'

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json'
  }
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (import.meta.env.DEV) {
      console.error('[ApiClient Error]:', error)
    }
    return Promise.reject(error)
  }
)

export default apiClient
