import { IFluxStandardAction } from '../FluxStandardAction';
import * as types from './types';

export interface ISetUser extends IFluxStandardAction {
  type: types.SET_USER;
  payload: types.IUser;
}

export interface ISetUserDetails extends IFluxStandardAction {
  type: types.SET_USER_DETAILS;
  payload: types.IUserDetails;
}

export interface ILoginRequest extends IFluxStandardAction {
  type: types.LOGIN_REQUESTED;
  // payload: types.IUser;
}

export interface ILoginError extends IFluxStandardAction {
  type: types.LOGIN_FAILURE | types.REGISTER_FAILURE;
  payload: types.ILoginError;
}

export interface ILoginSuccess extends IFluxStandardAction {
  type: types.LOGIN_SUCCESS;
}

export interface IRegisterRequest extends IFluxStandardAction {
  type: types.REGISTER_REQUESTED;
}

export interface ILogoutUser extends IFluxStandardAction {
  type: types.LOGOUT;
}

export interface ILikeRequest extends IFluxStandardAction {
  type: types.LIKE_REQUESTED;
  // payload: types.ILike;
}

export interface ILikeError extends IFluxStandardAction {
  type: types.LIKE_FAILED;
  payload: types.ILikeError;
}

export interface ILikeSuccess extends IFluxStandardAction {
  type: types.LIKE_SUCCESS;
}

export interface IUnLikeRequest extends IFluxStandardAction {
  type: types.UNLIKE_REQUESTED;
  // payload: types.ILike;
}

export interface IUnLikeError extends IFluxStandardAction {
  type: types.UNLIKE_FAILED;
  payload: types.ILikeError;
}

export interface IUnLikeSuccess extends IFluxStandardAction {
  type: types.UNLIKE_SUCCESS;
}

export interface ISetLike extends IFluxStandardAction {
  type: types.SET_LIKE;
  payload: types.ILike;
}

export interface ISetUnLike extends IFluxStandardAction {
  type: types.SET_UNLIKE;
  payload: string[];
}

export type UserStateAction =
  | ISetUser
  | ISetUserDetails
  | ILoginRequest
  | ILoginError
  | ILoginSuccess
  | IRegisterRequest
  | ILogoutUser
  | ILikeRequest
  | ILikeError
  | ILikeSuccess
  | IUnLikeRequest
  | IUnLikeError
  | IUnLikeSuccess
  | ISetLike
  | ISetUnLike
  
export const setUser = (user: types.IUser): ISetUser => ({
  type: types.SET_USER,
  payload: user,
});

export const setUserDetails = (
  userDetails: types.IUserDetails
): ISetUserDetails => ({
  type: types.SET_USER_DETAILS,
  payload: userDetails,
});

export const setLoginFailure = (error: types.ILoginError) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

export const SetLoginRequested = () => ({
  type: types.LOGIN_REQUESTED,
});

export const SetLoginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

export const Logout = () => ({
  type: types.LOGOUT,
});

export const SetRegisterRequested = () => ({
  type: types.REGISTER_REQUESTED,
});

export const SetRegisterFailure = (error: types.ILoginError) => ({
  type: types.REGISTER_FAILURE,
  payload: error,
});

export const SetLikeRequested = () => ({
  type: types.LIKE_REQUESTED,
});

export const SetLikeFailure = (error: types.ILikeError) => ({
  type: types.LIKE_FAILURE,
  payload: error,
});

export const SetLikeSuccess = () => ({
  type: types.LIKE_SUCCESS,
});

export const SetUnLikeRequested = () => ({
  type: types.UNLIKE_REQUESTED,
});

export const SetUnLikeFailure = (error: types.ILikeError) => ({
  type: types.UNLIKE_FAILURE,
  payload: error,
});

export const SetUnLikeSuccess = () => ({
  type: types.UNLIKE_SUCCESS,
});

export const SetLike = (like: types.ILike) => ({
  type: types.UNLIKE_SUCCESS,
  payload: like
});

export const SetUnLike = (unLike: string[]) => ({
  type: types.UNLIKE_SUCCESS,
  payload: unLike
});

export interface IUserActions {
  setUser(user: types.IUser): any;
  setUserDetails(userDetails: types.IUserDetails): any;
  loginUser(userLogin: types.IUser): any;
}

export default {
  setUser,
  setUserDetails,
  SetLoginRequested,
  SetLoginSuccess,
  setLoginFailure,
  Logout,
  SetLikeRequested,
  SetLikeFailure,
  SetLikeSuccess,
  SetUnLikeRequested,
  SetUnLikeFailure,
  SetUnLikeSuccess,
  SetLike,
  SetUnLike
};
