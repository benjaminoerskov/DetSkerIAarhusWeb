import './index.css';

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
      <RootComponent />
</Provider>,
document.getElementById('root')as HTMLElement);
registerServiceWorker();