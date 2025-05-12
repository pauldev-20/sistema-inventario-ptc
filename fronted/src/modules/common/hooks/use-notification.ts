'use client'
import { useToast } from './use-toast'
import { useEffect } from 'react'
import { type ApiError } from '../types'
import { useAppDispatch, useAppSelector } from './use-redux'
import { cleanNotificationState } from '../reducers/notification-reducer'

export function useNotification () {
  const { toast } = useToast()
  const { error, message } = useAppSelector(state => state.notification)
  const dispatch = useAppDispatch()

  const sucessNotification = ({ message }: { message?: string }) => {
    toast({
      title: message,
      type: 'foreground',
      variant: 'success',
      duration: 3000
    })
  }

  const infoNotification = ({ message }: { message?: string }) => {
    toast({
      title: message,
      type: 'foreground',
      variant: 'info',
      duration: 3000
    })
  }

  const errorNotification = ({ message }: { message?: string }) => {
    toast({
      title: message,
      type: 'foreground',
      variant: 'destructive',
      duration: 3000
    })
  }

  const handleNotifications = ({
    error,
    message
  }: {
    error?: ApiError
    message?: string
  }) => {
    if (error) {
      infoNotification({ message: error.message })
    } else if (message) {
      sucessNotification({ message })
    }
    dispatch(cleanNotificationState())
  }

  useEffect(() => {
    if (error ?? message) {
      handleNotifications({
        error,
        message
      })
    }
  }, [error, message])

  return {
    handleNotifications,
    errorNotification,
    error
  }
}
