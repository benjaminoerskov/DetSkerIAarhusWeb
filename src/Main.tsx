import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import AboutPage from './components/About/aboutPage';
import { IRouterLinkElementProps } from './components/Common/rootComponent';
// import HomePage from './components/Home/homePage';
import DetailPage from './components/OccurrenceFeed/occurrenceDetail';
import FeedPage from './components/OccurrenceFeed/occurrenceFeed';

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={FeedPage}/>
        <Route path='/feed' component={FeedPage}/>
        <Route path='/about' component={AboutPage}/>
        <Route path='/occurrences/:id' component={DetailPage}/>
      </Switch>
    </main>
  )
  
 export const routes: IRouterLinkElementProps[] = [
    {routeLink: "/feed", name: "Feed"},
    {routeLink: "/about", name: "About"},
]
  export default Main;