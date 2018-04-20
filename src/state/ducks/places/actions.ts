import {IFluxStandardAction} from '../FluxStandardAction';
import {IPlace} from '../occurrences/types';
import * as types from './types';

export interface ISetPlaces extends IFluxStandardAction {
  type : types.SET_PLACES;
  payload : IPlace[];
}

export type PlacesStateActions = ISetPlaces;

export const setPlaces = (places : IPlace[]) : ISetPlaces => ({type: types.SET_PLACES, payload: places});

export interface IPlacesActions {
  setPlaces(places : IPlace[]) : any;
}

export default {
  setPlaces
};
