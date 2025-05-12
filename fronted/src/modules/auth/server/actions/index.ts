'use server'

import { cookies } from 'next/headers'
import { type SignInResponse, type SignIn, type SignUp } from '../../types'
import { getExcepcionPayload } from '@/modules/common/lib'
import { logoutRequest, signInRequest, signUpRequest } from '../../services'
import { createSession, getSession } from '../../utils'

export async function signInAction (
  { name, password }: SignIn
) {
  try {
    const { data } = await signInRequest({ name, password })
    if (data.data) await createSession(data.data)
    return {
      data
    }
  } catch (error) {
    return {
      error: getExcepcionPayload(error)
    }
  }
}

export async function signUpAction (
  { name, password }: SignUp
) {
  try {
    const { data } = await signUpRequest({ name, password })
    if (data.data) await createSession(data.data)
    return {
      data
    }
  } catch (error) {
    return {
      error: getExcepcionPayload(error)
    }
  }
}

export async function logoutAction () {
  try {
    const { data } = await logoutRequest()
    await deleteSessionAction()
    return {
      data
    }
  } catch (error) {
    return {
      error: getExcepcionPayload(error)
    }
  }
}

export async function getSessionAction () {
  return await getSession()
}

export async function generateSessionAction (payload: SignInResponse) {
  await createSession(payload)
}

export async function deleteSessionAction () {
  cookies().delete('session')
}
