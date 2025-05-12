'use client'

import { useMutation } from '@tanstack/react-query'
import { type SignUpResponse, type SignInResponse, type User } from '../types'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/modules/common/hooks/use-redux'
import { logoutAction, signInAction, signUpAction } from '../server/actions'
import { type ApiData, type ApiError } from '@/modules/common/types'
import { setNotificationState } from '@/modules/common/reducers/notification-reducer'
import { logoutReducer, setUserReducer } from '../reducers'

export function useAuth () {
  const { user } = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { isPending: isLoadingSignIn, mutateAsync: signIn } = useMutation({
    mutationFn: signInAction,
    onSuccess: async ({ data, error }: { data?: ApiData<SignInResponse>, error?: ApiError }) => {
      if (error ?? !data) {
        dispatch(setNotificationState({ error }))
        return
      }
      dispatch(setNotificationState({ message: data.message }))
      router.push('/products')
    }
  })

  const { isPending: isLoadingSignUp, mutateAsync: signUp } = useMutation({
    mutationFn: signUpAction,
    onSuccess: async ({ data, error }: { data?: ApiData<SignUpResponse>, error?: ApiError }) => {
      if (error ?? !data) {
        dispatch(setNotificationState({ error }))
        return
      }
      dispatch(setNotificationState({ message: data.message }))
      router.push('/products')
    }
  })

  const { isPending: isLoadingLogout, mutateAsync: logout } = useMutation({
    mutationFn: logoutAction,
    onSuccess: async ({ data, error }: { data?: ApiData<null>, error?: ApiError }) => {
      if (error ?? !data) {
        dispatch(setNotificationState({ error }))
        return
      }
      dispatch(setNotificationState({ message: data.message }))
      dispatch(logoutReducer())
      router.push('/')
    }
  })

  const setUser = ({ user }: { user?: User }) => {
    if (user) {
      dispatch(setUserReducer(user))
    }
  }

  return {
    user,
    isLoadingSignIn,
    signIn,
    isLoadingLogout,
    logout,
    isLoadingSignUp,
    signUp,
    setUser
  }
}
