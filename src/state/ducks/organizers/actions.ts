import {IFluxStandardAction} from '../FluxStandardAction';
import {IOrganizer} from '../occurrences/types';
import * as types from './types';

export interface ISetOrganizers extends IFluxStandardAction {
  type : types.SET_ORGANIZERS;
  payload : IOrganizer[];
}

export type OrganizerStateActions = ISetOrganizers;

export const setOrganizers = (organizers : IOrganizer[]) : ISetOrganizers => ({type: types.SET_ORGANIZERS, payload: organizers});

export interface IOrganizerActions {
  setOrganizers(organizers : IOrganizer[]) : any;
}

export default {
  setOrganizers
};
