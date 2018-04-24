import {Dispatch} from 'redux';

import {IAppState} from '..';
import {getConfig} from '../../../utils/configHelper';
import userNetworkClient from '../../../utils/NetworkClients/userNetworkClient';
import {ReduxOperationReturnType} from '../../ReduxOperationReturnType';
import * as actions from './actions';
import {ILoginError, ILoginType, IRegisterUser, IUser, IUserDetails} from './types';

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

    const devUri = getConfig().urls.baseAPIURL + '/user';

    const req = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer: ' + user.token
      }
    };

    try {
      const response = await userNetworkClient.getAsync(devUri, req);
      if (response.ok) {
        const userDetails : IUserDetails = await response.json();
        dispatch(actions.setUserDetails(userDetails));
      }
    } catch (error) {
      throw error;
    }
  };
};

const loginUserAsync = (userLogin : ILoginType) => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {

    const devUri = getConfig().urls.baseAPIURL + '/Account/Login';

    try {
      dispatch(actions.SetLoginRequested());
      const response = await userNetworkClient.postAsync(devUri, userLogin);
      // tslint:disable-next-line:no-console
      console.log(response);
      if (response.ok) {
        const user : IUser = {
          token: await response.text()
        };
        dispatch(actions.setUser(user));
        dispatch(actions.SetLoginSuccess());
      } else {
        const LoginError : ILoginError = {
          error: await response.text()
        };
        dispatch(actions.setLoginFailure(LoginError));
      }
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
      throw error;
    }
  };
};

export interface IUserOperations {
  registerUserAsync : (newUser : IRegisterUser) => ReduxOperationReturnType;
  setUserDetailsAsync : (user : IUser) => ReduxOperationReturnType;
  loginUserAsync : (userLogin : ILoginType) => ReduxOperationReturnType;
};

export default {
  registerUserAsync,
  setUserDetailsAsync,
  loginUserAsync
};
