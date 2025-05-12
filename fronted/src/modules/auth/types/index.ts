export interface User {
  id: number
  name: string
}

export interface SignIn {
  name: string
  password: string
}

export interface SignUp extends SignIn {
  passwordConfirmation?: string
}

export interface SignInResponse {
  token: string
  user: User
  expiration: number
}

export interface SignUpResponse extends SignInResponse {}

export type Session = {
  token: string
  expiration: number
}
