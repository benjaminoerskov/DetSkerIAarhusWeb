import { Dispatch } from 'redux';

import { userActions } from '.';
import { IAppState } from '..';
import { getConfig } from '../../../utils/configHelper';
import userNetworkClient from '../../../utils/NetworkClients/userNetworkClient';
import { ReduxOperationReturnType } from '../../ReduxOperationReturnType';
import * as actions from './actions';
import { IAssociatedOccurrence, ILike, ILoginError, ILoginType, IRegisterUser, IUser, IUserDetails } from './types';

const registerUserAsync = (newUser : IRegisterUser) => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {

    const devUri = getConfig().urls.baseAPIURL + '/account/register';
    try {
      dispatch(actions.SetRegisterRequested());
      const response = await userNetworkClient.registerPostAsync(devUri, newUser);
      if (response.ok) {
        const user : IUser = {
          token: await response.text()
        };
        dispatch(actions.setUser(user));
        dispatch(actions.SetLoginSuccess());
      } else {
        dispatch(actions.SetRegisterFailure({
          error: await response.text()
        }));
      }
    } catch (error) {
      throw error;
    }
  };
};

const setUserDetailsAsync = (user : IUser) => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {
      dispatch(userActions.SetLoginRequested());
    const devUri = getConfig().urls.baseAPIURL + '/user?occurrencesWithHistory=false';

    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Secret':'herpderp',
        Authorization: 'Bearer ' + user.token
      }
    };

    try {
      const response = await userNetworkClient.getAsync(devUri, req);
      if (response.ok) {
        const userDetails : IUserDetails = await response.json();
        await dispatch(actions.setUserDetails(userDetails));
        dispatch(userActions.SetLoginSuccess());
        if(user.token !== ""){
          dispatch(userActions.setUser(user));
        }
      }
      else {
      dispatch(userActions.setLoginFailure({error: response.statusText}))
      }
    } catch (error) {
      dispatch(userActions.setLoginFailure(error))
      throw error;
    }
  };
};

const loginUserAsync = (userLogin : ILoginType, rememberMe: boolean) => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {

    const devUri = getConfig().urls.baseAPIURL + '/Account/Login';

    try {
      dispatch(actions.SetLoginRequested());
      const response = await userNetworkClient.postAsync(devUri, userLogin);
      if (response.ok) {
        const user : IUser = {
          token: await response.text()
        };
        if(rememberMe){
          window.localStorage.setItem("token", user.token);
        }
        await dispatch(actions.setUser(user));
        dispatch(actions.SetLoginSuccess());
      } else {
        const LoginError : ILoginError = {
          error: await response.text()
        };
        dispatch(actions.setLoginFailure(LoginError));
      }
    } catch (error) {
      throw error;
    }
  };
};

const likeOccurrenceAsync = (like: ILike) => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {
    const devUri = getConfig().urls.baseAPIURL + '/AssociatedOccurrences';
    try{
      dispatch(userActions.SetLikeRequested())
      const response = await userNetworkClient.postAsync(devUri, like);
    
    if(response.ok){
      const currentAssociated: IAssociatedOccurrence = {
        applicationUserId: '',
        id:'',
        occurrenceId: like.occurrenceId,
        type: '',
        tagsList: []
      }
      dispatch(userActions.SetLike(currentAssociated));
      dispatch(userActions.SetLikeSuccess());
    }
    else {
      dispatch(userActions.SetLikeFailure({error: response.statusText}))
    }
  }

    catch(error){
      dispatch(userActions.SetLikeFailure(error))
      throw{error}
    }
  }
}

const unLikeOccurrenceAsync = (like: ILike) => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {
    const devUri = getConfig().urls.baseAPIURL + '/AssociatedOccurrences';
    try{
      dispatch(userActions.SetUnLikeRequested())
      // TODO MAKE DELETE
      const response = await userNetworkClient.deleteAsync(devUri, like);
    
    if(response.ok){
      const unlike = getState().user.userDetails.associatedOccurrences.filter((val, i) => val.occurrenceId !== like.occurrenceId);

      dispatch(userActions.SetUnLike(unlike));
      dispatch(userActions.SetUnLikeSuccess());
    }
    else {
      dispatch(userActions.SetUnLikeFailure({error: response.statusText}))
    }
  }

    catch(error){
      dispatch(userActions.SetUnLikeFailure(error))
      throw{error}
    }
  }
}

const logoutUser = () => {
  return (dispatch : Dispatch < any >, getState : () => IAppState) => {
    dispatch(userActions.Logout());
  }
}

export interface IUserOperations {
  registerUserAsync : (newUser : IRegisterUser) => ReduxOperationReturnType;
  setUserDetailsAsync : (user : IUser) => ReduxOperationReturnType;
  loginUserAsync : (userLogin : ILoginType) => ReduxOperationReturnType;
  logoutUser : () => ReduxOperationReturnType;
  likeOccurrenceAsync : (like: ILike) => ReduxOperationReturnType;
  unLikeOccurrenceAsync : (like: ILike) => ReduxOperationReturnType;
};

export default {
  registerUserAsync,
  setUserDetailsAsync,
  loginUserAsync,
  logoutUser,
  likeOccurrenceAsync,
  unLikeOccurrenceAsync
};
