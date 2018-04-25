import {IOccurrence} from '../occurrences/types';

export const SET_USER = 'user/SET_USER';
export const SET_USER_DETAILS = 'user/SET_USER_DETAILS';
export const LOGIN_REQUESTED = 'user/LOGIN_REQUESTED';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const REGISTER_REQUESTED = 'user/REGISTER_REQUESTED';
export const REGISTER_FAILURE = 'user/REGISTER_FAILURE';
export const LOGOUT = 'user/LOGOUT';

export type SET_USER = typeof SET_USER;
export type SET_USER_DETAILS = typeof SET_USER_DETAILS;
export type LOGIN_REQUESTED = typeof LOGIN_REQUESTED;
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export type REGISTER_REQUESTED = typeof REGISTER_REQUESTED;
export type REGISTER_FAILURE = typeof REGISTER_FAILURE;
export type LOGOUT = typeof LOGOUT;

export interface IUser {
  token : string;
}

export interface IUserDetails {
  id : string;
  email : string;
  associatedOccurrences : IOccurrence[] | undefined;
}

export interface IRegisterUser {
  email : string;
  password : string;
  confirmPassword : string;
}

export interface ILoginType {
  email : string;
  password : string;
}

export interface ILoginError {
  error : string;
}
