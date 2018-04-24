import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppState } from '../../state/ducks';
import { userOperations } from '../../state/ducks/user';
import { IUserOperations } from '../../state/ducks/user/operations';
import { getUserViewState } from '../../state/ducks/user/selectors';
import { ILoginError, ILoginType, IUser } from '../../state/ducks/user/types';

interface ILoginScreenProps {
    userOperations: IUserOperations;
    user: IUser;
    loginError: ILoginError;
    isAuthenticating: boolean;
  }

  interface ILoginScreenState {
    userLogin: ILoginType;
  }

class LoginPage extends React.Component<ILoginScreenProps, ILoginScreenState> {

    constructor(props:any) {
        super(props);
    
        this.state = {
          userLogin: {
            email: '',
            password: '',
          },
        };
        this.onLoginPressed = this.onLoginPressed.bind(this);
      }
    

    onPasswordInputChange = (password:any) => {
        this.setState({
          userLogin: {
            ...this.state.userLogin,
            password,
          },
        });
      };

    inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
    this.setState({
        userLogin: {
        ...this.state.userLogin,
        [target.name]: value,
        },
    });
    };

    onLoginPressed(event: React.ChangeEvent<any>) {
        this.props.userOperations.loginUserAsync(this.state.userLogin);
        event.preventDefault();
        window.localStorage.setItem("donger", "token")
      }

public render(){
    return(
        <form onSubmit={this.onLoginPressed}  >
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                value={this.state.userLogin.email}
                onChange={this.inputChange}
                name="email"
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.userLogin.password} onChange={this.inputChange}/>
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
           
         <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
    }
}

const mapStateToProps = (state: IAppState) => {
    return {
        user: getUserViewState(state.user).user,
        loginError: getUserViewState(state.user).loginError,
        isAuthenticating: getUserViewState(state.user).isAuthenticating,
    };
  };

  const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        userOperations: bindActionCreators(userOperations, dispatch),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);