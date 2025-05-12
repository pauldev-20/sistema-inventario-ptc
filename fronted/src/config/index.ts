const {
  SECRET_KEY = 'rey-mono',
  API_URL = 'http://localhost:4000/api/v1',
  API_HEALTH = '/up',
  NEXT_PUBLIC_API_URL = '/api/v1'
} = process.env
export const config = {
  api: {
    url: API_URL,
    health: API_HEALTH
  },
  app: {
    secretKey: SECRET_KEY,
    api: NEXT_PUBLIC_API_URL
  }
}
