import { config } from '@/config'
import { profileRequest } from '../../services'

export const getProfile = async () => {
  try {
    const response = await profileRequest()
    if (!response.data) return null
    const { data } = response.data
    return data ?? null
  } catch (error) {
    return null
  }
}

export const checkHealth = async () => {
  try {
    const response = await fetch(`${config.api.health}`, {
      method: 'GET',
      cache: 'no-cache'
    })
    return response.ok
  } catch (error) {
    return false
  }
}
