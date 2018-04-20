import {OccurrencesStateAction} from './actions';
import * as types from './types';

export interface IOccurrencesState {
  occurs : types.IOccurrence[];
  pagination : types.IPagination;
  tags : types.ITags[];
  advSearchOccurs : types.IOccurrence[];
  searchPagination : types.IPagination;
}

export const defaultState : IOccurrencesState = {
  occurs: [],
  pagination: {
    page: 0,
    pageSize: 10,
    total: -1,
    loading: false
  },
  tags: [],
  advSearchOccurs: [],
  searchPagination: {
    page: 0,
    pageSize: 10,
    total: -1,
    loading: false
  }
};

export const occurencesReducer = (state : IOccurrencesState = defaultState, action : OccurrencesStateAction) : IOccurrencesState => {
  switch (action.type) {
    case types.SET_OCCURRENCES:
      return {
        ...state,
        occurs: [
          ...state.occurs,
          ...action.payload
        ],
        pagination: action.page
      };
    case types.REFRESH_OCCURRENCES:
      return {
        ...state,
        occurs: action.payload,
        pagination: action.page
      };
    case types.SET_TAGS:
      return {
        ...state,
        tags: action.payload
      };
    case types.ADVANCED_SEARCH_OCCURRENCES:
      return {
        ...state,
        advSearchOccurs: action.payload,
        searchPagination: action.page
      };
    case types.LOADMORE_ADVANCED_SEARCH_OCCURRENCES:
      return {
        ...state,
        advSearchOccurs: [
          ...state.advSearchOccurs,
          ...action.payload
        ],
        searchPagination: action.page
      };
    case types.REQUEST_OCCURRENCES:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          loading: true
        }
      };
    case types.REQUEST_ADVSEARCH:
      return {
        ...state,
        searchPagination: {
          ...state.searchPagination,
          loading: true
        }
      };
    case types.RESET_SEARCH_RESULT:
      return {
        ...state,
        searchPagination: {
          page: 1,
          pageSize: 10,
          loading: false,
          total: -1
        },
        advSearchOccurs: []
      };
    default:
      return state;
  }
};

export default occurencesReducer;
