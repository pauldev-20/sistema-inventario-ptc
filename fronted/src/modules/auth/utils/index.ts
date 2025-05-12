import 'server-only'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { type SignInResponse, type Session } from '../types'

const parseToken = (token: string): { exp: number, sub: string } => JSON.parse(atob(token.split('.')[1]))

export const createSession = async (payload: SignInResponse) => {
  const { exp } = parseToken(payload.token)
  const expiresIn = new Date(exp * 1000)

  const session = JSON.stringify({
    token: payload.token,
    expiration: payload.expiration
  })

  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresIn,
    sameSite: 'lax',
    path: '/'
  })
}

export const getSession = async (): Promise<Session | null> => {
  const cookie = cookies().get('session')?.value

  if (!cookie) {
    return null
  }

  const session = JSON.parse(cookie) as Session

  return session
}

export async function verifySession () {
  const cookie = cookies().get('session')?.value

  if (!cookie) {
    redirect('/')
  }

  return { isAuth: true, session: JSON.parse(cookie) as Session }
}
