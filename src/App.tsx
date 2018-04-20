import './App.css';

// import {History, Location} from 'history';
import * as React from 'react';
import Header from './components/common/header';
import Main from './Main';


// export interface IBasicHistoryProps {
//   history : History;
//   location : Location;
// }

// export interface IAppProps extends IBasicHistoryProps {
//   name : string;
// }

const App = () =>
(
      <div className="App">
         <Header/>
          <Main />
      </div>
    );
export default App;
