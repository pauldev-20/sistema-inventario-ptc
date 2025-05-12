import { api } from '@/modules/common/core'
import { type SignInResponse, type SignIn, type SignUp, type SignUpResponse, type User } from '../types'
import { type AxiosResponse } from 'axios'
import { type ApiData } from '@/modules/common/types'

export const signInRequest = async (data: SignIn): Promise<AxiosResponse<ApiData<SignInResponse>>> => await api.post('/auth/login', data)
export const signUpRequest = async (data: SignUp): Promise<AxiosResponse<ApiData<SignUpResponse>>> => await api.post('/auth/register', data)
export const logoutRequest = async (): Promise<AxiosResponse<ApiData<null>>> => await api.post('/auth/logout')
export const profileRequest = async (): Promise<AxiosResponse<ApiData<User>>> => await api.get('/auth/profile')
