import { UserStateAction } from './actions';
import * as types from './types';

export interface IUserState {
  user: types.IUser;
  userDetails: types.IUserDetails;
  loginError: types.ILoginError;
  registerError: types.ILoginError;
  isAuthenticating: boolean;
  isLoggedIn: boolean;
}

export const defaultState = {
  user: {
    token: '',
  },
  userDetails: {
    id: '',
    email: '',
    associatedOccurrences: undefined,
  },
  loginError: {
    error: '',
  },
  registerError: {
    error: '',
  },
  isAuthenticating: false,
  isLoggedIn: false,
};

export const userReducer = (
  state: IUserState = defaultState,
  action: UserStateAction
): IUserState => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case types.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.payload,
        isAuthenticating: false,
      };
    case types.LOGIN_REQUESTED:
      return {
        ...state,
        isAuthenticating: true,
        loginError: { error: '' },
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        loginError: { error: '' },
      };
    case types.REGISTER_REQUESTED:
      return {
        ...state,
        isAuthenticating: true,
        registerError: { error: '' },
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        registerError: action.payload,
        isAuthenticating: false,
      };
    default:
      return state;
  }
};

export default userReducer;
