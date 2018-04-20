import * as React from 'react';
import { Route, Switch } from 'react-router-dom'
import AboutPage from './About';
import HomePage from './components/Home/HomePage';
import DetailPage from './components/OccurrenceFeed/occurrenceDetail';
import FeedPage from './components/OccurrenceFeed/occurrenceFeed';

const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/feed' component={FeedPage}/>
        <Route path='/about' component={AboutPage}/>
        <Route path='/occurrences/:id' component={DetailPage}/>
      </Switch>
    </main>
  )
  
  export default Main