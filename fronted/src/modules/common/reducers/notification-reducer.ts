import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type ApiError } from '../types'

interface NotificationState {
  error?: ApiError
  message?: string
}

const initialState: NotificationState = {

}

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationState: (state, action: PayloadAction<{ message?: string, error?: ApiError }>) => {
      state.message = action.payload.message
      state.error = action.payload.error ? { ...action.payload.error } : undefined
    },
    cleanNotificationState: (state) => {
      state.message = undefined
      state.error = undefined
    }
  }
})

export const { cleanNotificationState, setNotificationState } = notificationReducer.actions

export default notificationReducer.reducer
