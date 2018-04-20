import { IUserState } from './reducers';

export const getUserViewState = (state: IUserState) => ({
  user: state.user,
  userDetails: state.userDetails,
  loginError: state.loginError,
  registerError: state.registerError,
  isAuthenticating: state.isAuthenticating,
});
