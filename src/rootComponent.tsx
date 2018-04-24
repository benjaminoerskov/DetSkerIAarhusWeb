import './App.css';

import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, NavLink } from 'react-router-dom';

import Main, { getRoutes } from './Main';
import { IAppState } from './state/ducks';
import { getUserViewState } from './state/ducks/user/selectors';

export interface IRootComponentProps {
    userLoggedIn: boolean;
}


class RootComponent extends React.PureComponent<IRootComponentProps> {

    public render() {
        return (
            <BrowserRouter>
                <div className= "App">
                    <NavigationBar isloggedIn={this.props.userLoggedIn}  />
                    <Main />
                </div>
            </BrowserRouter>
        );
    }
}

const NavigationBar = (props: {isloggedIn: boolean}) => {
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

const NavLinkElement = (props:IRouterLinkElementProps) => (
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
    userLoggedIn: getUserViewState(state.user).isLoggedIn
})

export default connect(mapStateToProps)(RootComponent);