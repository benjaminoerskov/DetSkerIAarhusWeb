import './index.css';

import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {render} from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store/store';

const storeConf = configureStore();
const store = storeConf.store;

render(
  <Provider store={store}>
  <MuiThemeProvider>
    <div>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </div>
  </MuiThemeProvider>
</Provider>,
document.getElementById('root')as HTMLElement);
registerServiceWorker();