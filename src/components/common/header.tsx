import * as React from 'react';
import {NavLink } from 'react-router-dom';

import logo from '../../logo.svg';

class Header extends React.Component {
    
    public render() {
        
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo imgSpin" alt="logo"/>
                    <nav>
                        <NavLink exact={true} activeClassName="selected" activeStyle={styleActive} to="/">Home</NavLink >
                        {" | "}
                        <NavLink activeClassName="selected" activeStyle={styleActive} to="/feed">Feed</NavLink >
                        {" | "}
                        <NavLink activeClassName="selected" activeStyle={styleActive} to="/about">About</NavLink >
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;

const styleActive={
    // fontWeight: 'bold',
    color: 'red'
   };