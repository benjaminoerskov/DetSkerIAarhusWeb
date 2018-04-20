import { Dispatch } from 'redux';

import { IAppState } from '..';
import occurrencesNetworkClient from '../../../utils/networkClient';
import { ReduxOperationReturnType } from '../../ReduxOperationReturnType';
import * as actions from './actions';
import { IOccurrence, ITags } from './types';

export interface IResourceOptions {
  startDate : string;
  endDate : string;
  refresh : boolean;
  searchName : string;
  organizerIds : string[];
  tags : string[];
  placesId : string[];
  hasMore: boolean;
}



const getEventsAsync = (options : IResourceOptions, pageNumber : number, pageSize : number) => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {

    const uri = 'https://api.detskeriaarhus.dk/api/occurrences.jsonld' + filterRequest(options, pageNumber, pageSize);

    await dispatch(actions.requestOccurrences());

    try {
      const response = await occurrencesNetworkClient.getAsync(uri, {});
      const responseAsJson = await response.json();
      const occurrences = responseAsJson['hydra:member'];
      const total = responseAsJson['hydra:totalItems'];

      if (options.refresh) {
        await dispatch(actions.refreshOccurrences(occurrences, {
          page: 1,
          pageSize: 10,
          total,
          loading: false
        }));
      } else {
        await dispatch(actions.setOccurrences(occurrences, {
          page: pageNumber,
          pageSize,
          total,
          loading: false
        }));
        
      }
    } catch (error) {
      throw error;
    }
  };
};

const getAdvSearchEventsAsync = (options : IResourceOptions, pageNumber : number, pageSize : number) => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {

    const uri = 'https://api.detskeriaarhus.dk/api/occurrences.jsonld' + filterRequest(options, pageNumber, pageSize);
    await dispatch(actions.requestAdvSearch());
    try {
      const response = await occurrencesNetworkClient.getAsync(uri, {});
      const responseAsJson = await response.json();
      const advSrchOccurs = responseAsJson['hydra:member'];
      const total = responseAsJson['hydra:totalItems'];

      if (options.refresh) {
        await dispatch(actions.advancedSearchOccurrences(advSrchOccurs, {
          page: 1,
          pageSize: 10,
          total,
          loading: false
        }));
      } else {
        await dispatch(actions.loadMoreAdvancedSearchOccurrences(advSrchOccurs, {
          page: pageNumber,
          pageSize,
          total,
          loading: false
        }));
      }
    } catch (error) {
      throw error;
    }
  };
};

const getTagsAsync = () => {
  return async(dispatch : Dispatch < any >, getState : () => IAppState) => {

    const uri = 'https://api.detskeriaarhus.dk/api/tags';
    try {
      const response = await occurrencesNetworkClient.getAsync(uri, {});
      if (response.ok) {
        const json = await response.json();
        const tags : ITags[] = json['hydra:member'];
        dispatch(actions.setTags(tags));
      }
    } catch (error) {
      throw error;
    }
  };
};

const filterRequest = (options : IResourceOptions, page : number, pageSize : number) : string => {
  let req = '?';

  if (options.startDate !== null) {
    req += 'startDate[after]=' + options.startDate;
  } else {
    req += 'startDate[after]=now';
  }

  if (page !== null) {
    req += '&page=' + page.toString();
  }

  if (pageSize !== null) {
    req += '&items_per_page=' + pageSize.toString();
  } else {
    req += '&items_per_page=20'; // Max 20 events
  }

  if (options.searchName !== '') {
    req += '&event.name=' + options.searchName;
  }

  if (options.organizerIds.length > 0) {
    req += '&event.organizer.id[]=';
    options
      .organizerIds
      .forEach(element => {
        req += element + '%2C'; // comma-seperation in url
      });
  }

  if (options.tags.length > 0) {
    options
      .tags
      .forEach(element => {
        req += '&event.tags[]=' + element; // OR
      });
  }

  if (options.placesId.length > 0) {
    req += '&place.id[]=';
    options
      .placesId
      .forEach(element => {
        req += element + '%2C';
      });
  }

  return req;
};

// @ts-ignore
export  const getSingleEvent = async (id:string): Promise<IOccurrence> => {
    const uri = 'https://api.detskeriaarhus.dk/api/occurrences/' + id;
    try {
       const response = await occurrencesNetworkClient.getAsync(uri, {});
       return response.json();
      
    }
    catch (error) {
      throw error;
    }
  
}

export interface IOccurrencesOperations {
  getEventsAsync : (options : IResourceOptions, pageNumber : number, pageSize : number) => ReduxOperationReturnType;
  getTagsAsync : () => ReduxOperationReturnType;
  getAdvSearchEventsAsync : (options : IResourceOptions, pageNumber : number, pageSize : number) => ReduxOperationReturnType;
  getOrganizers : () => ReduxOperationReturnType;
};

export default {
  getEventsAsync,
  getTagsAsync,
  getAdvSearchEventsAsync,
  getSingleEvent
};
