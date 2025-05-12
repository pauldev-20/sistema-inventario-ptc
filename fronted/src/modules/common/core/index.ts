import { config } from '@/config'
import { getSessionAction } from '@/modules/auth/server/actions'
import axios from 'axios'

const baseUrl = typeof window === 'undefined' ? config.api.url : config.app.api
export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json'
  },
  withXSRFToken: true
})

api.interceptors.request.use(async (config) => {
  const session = await getSessionAction()
  if (session) {
    config.headers.Authorization = `Bearer ${session.token}`
  }
  return config
})
