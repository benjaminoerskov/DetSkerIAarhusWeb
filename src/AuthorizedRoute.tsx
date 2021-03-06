import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { IAppState } from './state/ducks';
import { getUserViewState } from './state/ducks/user/selectors';


interface IAuthorizedComponentProps extends RouteProps {
    isLoggedIn: boolean;
    isAuthenticating: boolean;
    component: (props: any) => JSX.Element
}

class AuthorizedRoute extends Route<IAuthorizedComponentProps> {
  
    render() {
      const { component: Component, isAuthenticating, isLoggedIn, ...rest } = this.props
      return (
        <Route {...rest} render={() => {
          if (isAuthenticating) {return <div>Loading...</div>}
          return isLoggedIn
            ? <Component {...this.props} />
            : <Redirect to="/login" />
        }} />
      )
    }
  }
  
  const mapStateToProps = (state: IAppState) => ({
    // isLoggedIn: true,
    isLoggedIn: getUserViewState(state.user).isLoggedIn,
    isAuthenticating: getUserViewState(state.user).isAuthenticating
  })
  
  export default connect(mapStateToProps)(AuthorizedRoute)