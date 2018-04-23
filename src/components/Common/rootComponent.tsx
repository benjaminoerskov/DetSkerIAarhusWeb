import * as React from 'react';
import { BrowserRouter} from 'react-router-dom';

import Main from '../../Main';
import NavigationBar from './navigationBar';

class RootComponent extends React.Component {
    
    public render() {
        return (
            <BrowserRouter> 
            <>
            <NavigationBar/>
            <Main />
            </>
            </BrowserRouter>
        );
    }
}

// const NavigationBar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <NavLink className="navbar-brand" to={"/"} >Home</NavLink>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNav">
//                 <ul className="navbar-nav">
//                     <ConstructNavLinkElements routes={routes} />
//                 </ul>
//             </div>
//         </nav>
//     )
// }

// export interface IRouterLinkElementProps {
//     routeLink: string;
//     name: string;
// }

// const NavLinkElement = (props:IRouterLinkElementProps) => (
//     <li className="nav-item">
//     <NavLink className="nav-link" activeClassName="active" to={props.routeLink} >{props.name}</NavLink>
//   </li>
// )

// const ConstructNavLinkElements = (props: { routes: IRouterLinkElementProps[] }): JSX.Element => (
//     <>
//         {props.routes.map((data) => {
//             return <NavLinkElement routeLink={data.routeLink} name={data.name} key={data.routeLink} />
//         })}
//     </>
// )

export default RootComponent;