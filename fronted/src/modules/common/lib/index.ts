import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type ApiError } from '../types'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const InternalError: ApiError = {
  message: 'Ocurrio un error durante la consulta.',
  status: false,
  code: 500
}

export const getExcepcionPayload = (error: unknown): ApiError => {
  if (typeof error !== 'object' || (error == null)) {
    return InternalError
  }

  const typeObject = error as Record<string, unknown>
  // eslint-disable-next-line no-prototype-builtins
  if (error.hasOwnProperty('response') && typeof typeObject.response === 'object' && typeObject.response !== null) {
    const { data, status } = typeObject.response as { data: Record<string, unknown>, status: number }

    if (typeof data === 'object' && data !== null && typeof status === 'number') {
      const { message, errors } = data as { message: string, errors: Record<string, string[]> | undefined }
      if (typeof message === 'string' && errors !== undefined) {
        return {
          message,
          status: false,
          code: status,
          errors
        }
      }
      if (typeof message === 'string') {
        return {
          message,
          status: false,
          code: status
        }
      }
    }
  }

  const typeException = error as ApiError

  // eslint-disable-next-line no-prototype-builtins
  if (error.hasOwnProperty('message') && typeof typeException.message === 'string' && error.hasOwnProperty('code') && typeof typeException.code === 'string') {
    return {
      message: typeException.message,
      code: typeException.code,
      status: false
    }
  }
  return InternalError
}
