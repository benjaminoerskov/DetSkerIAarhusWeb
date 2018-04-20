import {Dispatch} from 'react-redux';

import {IAppState} from '..';
import placesNetworkClient from '../../../utils/NetworkClients/placesNetworkClient';
import {ReduxOperationReturnType} from '../../ReduxOperationReturnType';
import * as actions from './actions';

const getPlacesAsync = () => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {

    const uri = 'https://api.detskeriaarhus.dk/api/places';
    const req = {
      header: 'GET'
    };

    try {
      const response = await placesNetworkClient.getAsync(uri, req);
      if (response.ok) {
        const json = await response.json();
        const places = json['hydra:member'];
        dispatch(actions.setPlaces(places));
      }
    } catch (error) {
      throw error;
    }
  };
};

const getPlacesByName = (searchTerm : string) => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {
    const uri = 'https://api.detskeriaarhus.dk/api/places?name=' + searchTerm;
    const req = {
      header: 'GET',
      'Content-Type': 'application/json'
    };

    try {
      const response = await placesNetworkClient.getAsync(uri, req);

      if (response.ok) {
        const json = await response.json();
        const places = json['hydra:member'];
        dispatch(actions.setPlaces(places));
      }
    } catch (error) {
      throw error;
    }
  };
};

export interface IPlacesOperations {
  getPlacesAsync : () => ReduxOperationReturnType;
  getPlacesByName : (searchTerm : string) => ReduxOperationReturnType;
};

export default {
  getPlacesAsync,
  getPlacesByName
};
