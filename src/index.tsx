import './index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import RootComponent from './rootComponent';
import { configureStore } from './store/store';

const storeConf = configureStore();
const store = storeConf.store;

render(
  <Provider store={store}>
  <MuiThemeProvider>
      <RootComponent />
  </MuiThemeProvider>
</Provider>,
document.getElementById('root')as HTMLElement);
registerServiceWorker();