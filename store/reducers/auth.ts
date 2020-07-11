

import { SIGN_UP, SIGN_IN, AuthActionTypes, AuthState } from './../../models/authTypes';

const initialState = {
  token: null,
  userId: null
}

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case SIGN_UP: {
      const { token, userId } = action.payload
      return { token, userId }
    }
    case SIGN_IN:
      const { token, userId } = action.payload
      return { token, userId }
    default:
      return state
  }
}