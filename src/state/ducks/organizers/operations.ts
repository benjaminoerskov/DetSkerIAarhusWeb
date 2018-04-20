import {Dispatch} from 'redux';

import {IAppState} from '..';
import occurrencesNetworkClient from '../../../utils/networkClient';
import {ReduxOperationReturnType} from '../../ReduxOperationReturnType';
import {IOrganizer} from '../occurrences/types';
import * as actions from './actions';

const getOrganizers = () => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {

    const uri = 'https://api.detskeriaarhus.dk/api/organizers';

    try {
      const response = await occurrencesNetworkClient.getAsync(uri, {});
      if (response.ok) {
        const json = await response.json();
        const organizers : IOrganizer[] = await json['hydra:member'];
        dispatch(actions.setOrganizers(organizers));
      }
    } catch (error) {
      throw error;
    }
  };
};

export interface IOrganizersOperations {
  getOrganizers : () => ReduxOperationReturnType;
};

export default {
  getOrganizers
};
