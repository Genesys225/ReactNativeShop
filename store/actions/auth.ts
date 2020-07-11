import { auth } from '../../config/http';
import { RootState } from './../configureStore';
import { ThunkAction } from 'redux-thunk';
import {
  SIGN_UP,
  AuthActionTypes,
  SIGN_IN,
} from './../../models/authTypes';

type ISignUp = (
  email: string,
  password: string
) => ThunkAction<Promise<void>, RootState, {}, AuthActionTypes>;

const reqAuth = async (
  type: 'login' | 'signUp',
  email: string,
  password: string
) => {
  let route = 'accounts:signUp';
  const reqBody = { email, password, returnSecureToken: true }
  if (type === 'login') {
    route = 'accounts:signInWithPassword';
  }
  return await auth.post(route, reqBody);
};

export const signUp: ISignUp = (email, password) => {
  return async (dispatch) => {
    const response = await reqAuth('signUp', email, password);
    const { idToken, localId } = response
    dispatch({ type: SIGN_UP, payload: { token: idToken, userId: localId } })
  };
};

export const signIn: ISignUp = (email, password) => {
  return async (dispatch) => {
    const response = await reqAuth('login', email, password);
    const { idToken, localId } = response
    dispatch({ type: SIGN_IN, payload: { token: idToken, userId: localId } })
  };
};