import {IPlace} from '../occurrences/types';
import {PlacesStateActions} from './actions';
import * as types from './types';

export interface IPlacesState {
  places : IPlace[];
}

export const defaultstate : IPlacesState = {
  places: []
};

export const placesReducer = (state : IPlacesState = defaultstate, action : PlacesStateActions) : IPlacesState => {
  switch (action.type) {
    case types.SET_PLACES:
      return {
        ...state,
        places: action.payload
      };
    default:
      {
        return state;
      }
  }
};

export default placesReducer;
