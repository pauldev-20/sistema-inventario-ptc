import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type User } from '../types'

interface AuthState {
  user?: User
  expiration?: number
}

const initialState: AuthState = {
}

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setExpirationReducer: (state, action: PayloadAction<number>) => {
      state.expiration = action.payload
    },
    setUserReducer: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logoutReducer: (state) => {
      state.user = undefined
      state.expiration = undefined
    }
  }
})

export const { setExpirationReducer, setUserReducer, logoutReducer } = authReducer.actions
export default authReducer.reducer
