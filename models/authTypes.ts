export const SIGN_UP = 'SIGN_UP'
export const SIGN_IN = 'SIGN_IN'

export interface SignUpAction {
  type: 'SIGN_UP'
  payload: { token: string, userId: string }
}

export interface SignInAction {
  type: 'SIGN_IN'
  payload: { token: string, userId: string }
}

export interface AuthState {
  token: string | null,
  userId: string | null
}

export type AuthActionTypes = SignInAction | SignUpAction