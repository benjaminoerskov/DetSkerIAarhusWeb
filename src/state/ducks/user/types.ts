
export const SET_USER = 'user/SET_USER';
export const SET_USER_DETAILS = 'user/SET_USER_DETAILS';
export const LOGIN_REQUESTED = 'user/LOGIN_REQUESTED';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const REGISTER_REQUESTED = 'user/REGISTER_REQUESTED';
export const REGISTER_FAILURE = 'user/REGISTER_FAILURE';
export const LOGOUT = 'user/LOGOUT';
export const LIKE_REQUESTED = 'user/LIKE_REQUESTED';
export const LIKE_FAILURE = 'user/LIKE_FAILURE';
export const LIKE_SUCCESS = 'user/LIKE_SUCCESS';
export const UNLIKE_REQUESTED = 'user/UNLIKE_REQUESTED';
export const UNLIKE_FAILURE = 'user/UNLIKE_FAILURE';
export const UNLIKE_SUCCESS = 'user/UNLIKE_SUCCESS';
export const SET_LIKE = 'user/SET_LIKE';
export const SET_UNLIKE = 'user/SET_UNLIKE';


export type SET_USER = typeof SET_USER;
export type SET_USER_DETAILS = typeof SET_USER_DETAILS;
export type LOGIN_REQUESTED = typeof LOGIN_REQUESTED;
export type LOGIN_FAILURE = typeof LOGIN_FAILURE;
export type LOGIN_SUCCESS = typeof LOGIN_SUCCESS;
export type REGISTER_REQUESTED = typeof REGISTER_REQUESTED;
export type REGISTER_FAILURE = typeof REGISTER_FAILURE;
export type LOGOUT = typeof LOGOUT;
export type LIKE_REQUESTED = typeof LIKE_REQUESTED;
export type LIKE_FAILED = typeof LIKE_FAILURE;
export type LIKE_SUCCESS = typeof LIKE_SUCCESS;
export type UNLIKE_REQUESTED = typeof UNLIKE_REQUESTED;
export type UNLIKE_FAILED = typeof UNLIKE_FAILURE;
export type UNLIKE_SUCCESS = typeof UNLIKE_SUCCESS;
export type SET_LIKE = typeof SET_LIKE;
export type SET_UNLIKE = typeof SET_UNLIKE;

export interface IUser {
  token : string;
}

export interface IUserDetails {
  id : string;
  email : string;
  associatedOccurrences : IAssociatedOccurrence[];
}

export interface IAssociatedOccurrence {
id: string;
applicationUserId: string;
occurrenceId: string;
type: string;
tagsList: ITag[]
}

export interface ITag {
  associatedOccurrencesId: string;
  id: string;
  tag: string;
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

export interface ILikeError {
  error : string;
}

export interface ILike {
  occurrenceId : string;
}