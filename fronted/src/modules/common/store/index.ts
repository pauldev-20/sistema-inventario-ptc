'use client'
import { configureStore } from '@reduxjs/toolkit'
import NotificationReducer from '../reducers/notification-reducer'
import AuthReducer from '../../auth/reducers'
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: AuthReducer,
      notification: NotificationReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
