import {IOrganizer} from '../occurrences/types';
import {OrganizerStateActions} from './actions';
import * as types from './types';

export interface IOrganizersState {
  organizers : IOrganizer[];
}

export const defaultState : IOrganizersState = {
  organizers: []
};

export const organizersReducer = (state : IOrganizersState = defaultState, action : OrganizerStateActions) : IOrganizersState => {
  switch (action.type) {
    case types.SET_ORGANIZERS:
      return {
        ...state,
        organizers: action.payload
      };
    default:
      return state;
  }
};

export default organizersReducer;
