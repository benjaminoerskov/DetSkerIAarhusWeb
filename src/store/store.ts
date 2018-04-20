import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../state/ducks';

import { composeWithDevTools } from 'redux-devtools-extension';
import immutableStateInvariant from 'redux-immutable-state-invariant';

export const configureStore = () => {
    const store = getStore();
  
    // Switch the comments below around to clear store
    // const persistor = persistStore(store);
  
    return { store };
  };

  const middleware = [thunk, immutableStateInvariant()]

const getStore = () => {
    
      // *** REMOTEDEV.IO SETUP ***
      const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(...middleware))
      );
      return store;
  };