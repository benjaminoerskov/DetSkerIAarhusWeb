import './App.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, NavLink } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

import Main, { getRoutes } from './Main';
import { IAppState } from './state/ducks';
import { userOperations } from './state/ducks/user';
import { IUserOperations } from './state/ducks/user/operations';
import { getUserViewState } from './state/ducks/user/selectors';

export interface IRootComponentProps {
    userLoggedIn: boolean;
    loading: boolean;
    userOperations: IUserOperations;
}


class RootComponent extends React.PureComponent<IRootComponentProps> {

    async componentDidMount() {
        // const token = window.localStorage.getItem("token");
        // if(token==="" || token === null)
        // {
        //     // return;
        // }
        await this.props.userOperations.setUserDetailsAsync({
            token: (window.localStorage.getItem("token") as string)
        })

    }

    public render() {
        if (this.props.loading) {
            return (
                <div>Loading... </div>
            );
        }
        return (
            <BrowserRouter>
                <div className="App">
                    <NavigationBar isloggedIn={this.props.userLoggedIn} />
                    <Main />
                </div>
            </BrowserRouter>
        );
    }
}

const NavigationBar = (props: { isloggedIn: boolean }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to={"/"} >Home</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <ConstructNavLinkElements routes={getRoutes(props.isloggedIn)} />
                </ul>
            </div>
        </nav>
    )
}

export interface IRouterLinkElementProps {
    routeLink: string;
    name: string;
}

const NavLinkElement = (props: IRouterLinkElementProps) => (
    <li className="nav-item">
        <NavLink className="nav-link" exact={true} activeClassName="active" to={props.routeLink} >{props.name}</NavLink>
    </li>
)

const ConstructNavLinkElements = (props: { routes: IRouterLinkElementProps[] }): JSX.Element => (
    <>
        {props.routes.map((data) => {
            return <NavLinkElement routeLink={data.routeLink} name={data.name} key={data.routeLink} />
        })}
    </>
)

const mapStateToProps = (state: IAppState) => ({
    userLoggedIn: getUserViewState(state.user).isLoggedIn,
    loading: getUserViewState(state.user).isAuthenticating
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    userOperations: bindActionCreators(userOperations, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RootComponent);