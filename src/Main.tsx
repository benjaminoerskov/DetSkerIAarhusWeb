import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import AuthorizedRoute from './AuthorizedRoute';
import AboutPage from './components/About/aboutPage';
import HomePage from './components/Home/homePage';
import DetailPage from './components/OccurrenceFeed/occurrenceDetail';
import FeedPage from './components/OccurrenceFeed/occurrenceFeed';
import LoginPage from './components/User/LoginPage';
import RegisterPage from './components/User/RegisterPage';
import UserPage from './components/User/UserPage';
import { IRouterLinkElementProps } from './rootComponent';

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/feed' component={FeedPage}/>
        <Route path='/about' component={AboutPage}/>
        <Route path='/occurrences/:id' component={DetailPage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
        <AuthorizedRoute component={Authorized}/>
        <Redirect to="/"/>
      </Switch>
    </main>
  )

  const Authorized = (props:any) => {
    return(
    <Route path='/user' component={UserPage}/>
    );
  }
  
  
 export const routes: IRouterLinkElementProps[] = [
    {routeLink: "/feed", name: "Feed"},
    {routeLink: "/about", name: "About"},
]

export function getRoutes(isLoggedIn: boolean) {
  if(!isLoggedIn){
    return [...routes, {routeLink: "/login", name:"Login"}]
  }
  return [...routes, {routeLink: "/user", name:"User"}]
}

  export default Main;