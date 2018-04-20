import * as React from 'react';
import {Link} from 'react-router-dom';

import logo from '../../logo.svg';

class Header extends React.Component {
    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <div>
                        <Link to="/">Home</Link>
                        {" | "}
                        <Link to="/feed">Feed</Link>
                        {" | "}
                        <Link to="/about">About</Link>
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;
