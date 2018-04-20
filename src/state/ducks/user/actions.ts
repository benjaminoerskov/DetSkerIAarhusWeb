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
  payload: types.IUser;
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

export type UserStateAction =
  | ISetUser
  | ISetUserDetails
  | ILoginRequest
  | ILoginError
  | ILoginSuccess
  | IRegisterRequest;

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

export const SetRegisterRequested = () => ({
  type: types.REGISTER_REQUESTED,
});

export const SetRegisterFailure = (error: types.ILoginError) => ({
  type: types.REGISTER_FAILURE,
  payload: error,
});

export interface IUserActions {
  setUser(user: types.IUser): any;
  setUserDetails(userDetails: types.IUserDetails): any;
  loginUser(userLogin: types.IUser): any;
}

export default {
  setUser,
  setUserDetails,
};
