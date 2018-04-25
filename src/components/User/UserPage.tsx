import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppState } from '../../state/ducks';
import { userOperations } from '../../state/ducks/user';
import { IUserOperations } from '../../state/ducks/user/operations';
import { getUserViewState } from '../../state/ducks/user/selectors';
import { ILoginError, IUser, IUserDetails } from '../../state/ducks/user/types';


interface IUserScreenProps {
    userOperations: IUserOperations;
    user: IUser;
    loginError: ILoginError;
    isAuthenticating: boolean;
    userDetails: IUserDetails;
  }


class UserPage extends React.Component<IUserScreenProps> {
    constructor(props:any) {
        super(props);
    
    
        this.onLogOut = this.onLogOut.bind(this);
    }


    onLogOut() {
        window.localStorage.removeItem("token");
        this.props.userOperations.logoutUser();
        location.reload();
        // Redirect
    }

    public render(){
        return(
            <>
            <h1>User page :)</h1>
            <h2>Email: {this.props.userDetails.email}</h2>
            <h2>Id for dev: {this.props.userDetails.id}</h2>
            <button className="btn btn-default" onClick={this.onLogOut}>Logout</button>
            </>
        );
    }
}



const mapStateToProps = (state: IAppState) => {
    return {
        user: getUserViewState(state.user).user,
        loginError: getUserViewState(state.user).loginError,
        isAuthenticating: getUserViewState(state.user).isAuthenticating,
        userDetails: getUserViewState(state.user).userDetails
    };
  };

  const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        userOperations: bindActionCreators(userOperations, dispatch),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);