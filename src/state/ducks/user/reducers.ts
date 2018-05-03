import { UserStateAction } from './actions';
import * as types from './types';

export interface IUserState {
  user: types.IUser;
  userDetails: types.IUserDetails;
  loginError: types.ILoginError;
  registerError: types.ILoginError;
  likeError: types.ILikeError;
  isAuthenticating: boolean;
  isLoggedIn: boolean;
  isLoadingLike: boolean;
}

export const defaultState = {
  user: {
    token: '',
  },
  userDetails: {
    id: '',
    email: '',
    associatedOccurrences: [],
  },
  loginError: {
    error: '',
  },
  registerError: {
    error: '',
  },
  likeError: {
    error: '',
  },
  isAuthenticating: true,
  isLoggedIn: false,
  isLoadingLike: false,
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
        isLoggedIn: true
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loginError: action.payload,
        isAuthenticating: false,
        isLoggedIn: false
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
        isLoggedIn: true,
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
      case types.LOGOUT:
      return {
        ...state,
        user: defaultState.user,
        userDetails: defaultState.userDetails
      }
      case types.LIKE_REQUESTED:
      return {
        ...state,
        isLoadingLike: true
      };
      case types.LIKE_SUCCESS:
      return {
        ...state,
        isLoadingLike: false,
        likeError: {error: ''}
      };
      case types.LIKE_FAILURE:
      return {
        ...state,
        isLoadingLike: false,
        likeError: action.payload
      };
      case types.UNLIKE_REQUESTED:
      return {
        ...state,
        isLoadingLike: true
      };
      case types.UNLIKE_SUCCESS:
      return {
        ...state,
        isLoadingLike: false,
        likeError: {error: ''}
      };
      case types.UNLIKE_FAILURE:
      return {
        ...state,
        isLoadingLike: false,
        likeError: action.payload
      };
      case types.SET_LIKE:
      return {
        ...state,
        userDetails:{
          ...state.userDetails,
          associatedOccurrences: [
            ...state.userDetails.associatedOccurrences,
            action.payload
          ]
        }
      }
      case types.SET_UNLIKE:
      return {
        ...state,
        userDetails:{
          ...state.userDetails,
          associatedOccurrences: action.payload
        }
      }

    default:
      return state;
  }
};

export default userReducer;
