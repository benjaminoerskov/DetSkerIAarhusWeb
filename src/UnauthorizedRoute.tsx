import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { IAppState } from './state/ducks';
import { getUserViewState } from './state/ducks/user/selectors';


 interface IUnauthorizedComponentProps extends RouteProps {
    isLoggedIn: boolean;
    isAuthenticating: boolean;
    component: (props: any) => JSX.Element
}

class UnauthorizedRoute extends Route<IUnauthorizedComponentProps> {
  
    render() {
      const { component: Component, isAuthenticating, isLoggedIn, ...rest } = this.props
      return (
        <Route {...rest} render={() => {
          if (isAuthenticating) {
            return <div>Loading...</div>}
          return isLoggedIn
            ? <Redirect to="/user"/>
            : <Component {...this.props} />
        }} />
      )
    }
  }
  
  const mapStateToProps = (state: IAppState) => ({
    // isLoggedIn: true,
    isLoggedIn: getUserViewState(state.user).isLoggedIn,
    isAuthenticating: getUserViewState(state.user).isAuthenticating
  })
  
  export default connect(mapStateToProps)(UnauthorizedRoute)