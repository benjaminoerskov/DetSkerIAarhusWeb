import { combineReducers } from 'redux';


import occurrencesReducer, {
  defaultState as occurrencesDefault,
  IOccurrencesState,
} from './occurrences/reducers';

import userReucer, {
  defaultState as userDefault,
  IUserState,
} from './user/reducers';

import placesReducer, {
  defaultstate as placesDefault,
  IPlacesState,
} from './places/reducers';

import organizerReducer, {
  defaultState as organizersDefault,
  IOrganizersState,
} from './organizers/reducers';
// import likesReducer, {
//   ILikesState,
//   defaultState as likesDefault,
// } from './likes/reducers';

export interface IAppState {
  occurrences: IOccurrencesState;
  user: IUserState;
  // likes: ILikesState;
  places: IPlacesState;
  organizers: IOrganizersState;
}

export const appDefaultState: IAppState = {
  occurrences: occurrencesDefault,
  organizers: organizersDefault,
  places: placesDefault,
  user: userDefault,
  // likes: likesDefault,
  // nav: navDefault,
};

// @ts-ignore https://github.com/Microsoft/TypeScript/issues/16795
export const rootReducer = combineReducers({
  occurrences: occurrencesReducer,
  organizers: organizerReducer,
  places: placesReducer,
  // likes: likesReducer,
  user: userReucer,
});
