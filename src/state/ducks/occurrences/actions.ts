import {IFluxStandardAction} from '../FluxStandardAction';
import * as types from './types';

export interface ISetOccurrences extends IFluxStandardAction {
  type : types.SET_OCCURRENCES;
  payload : types.IOccurrence[];
  page : types.IPagination;
}

export interface IRefreshOccurrences extends IFluxStandardAction {
  type : types.REFRESH_OCCURRENCES;
  payload : types.IOccurrence[];
  page : types.IPagination;
}

export interface ISetTags extends IFluxStandardAction {
  type : types.SET_TAGS;
  payload : types.ITags[];
}

export interface IAdvancedSearchOccurrences extends IFluxStandardAction {
  type : types.ADVANCED_SEARCH_OCCURRENCES;
  payload : types.IOccurrence[];
  page : types.IPagination;
}

export interface ILoadMoreAdvancedSearchOccurrences
extends IFluxStandardAction {
  type : types.LOADMORE_ADVANCED_SEARCH_OCCURRENCES;
  payload : types.IOccurrence[];
  page : types.IPagination;
}

export interface IRequestOccurrences extends IFluxStandardAction {
  type : types.REQUEST_OCCURRENCES;
}

export interface IRequestAdvSearch extends IFluxStandardAction {
  type : types.REQUEST_ADVSEARCH;
}

export interface IResetSearchResults extends IFluxStandardAction {
  type : types.RESET_SEARCH_RESULT;
}

export type OccurrencesStateAction = |ISetOccurrences | IRefreshOccurrences | ISetTags | IAdvancedSearchOccurrences | ILoadMoreAdvancedSearchOccurrences | IRequestOccurrences | IRequestAdvSearch | IResetSearchResults;

export const setOccurrences = (occurs : types.IOccurrence[], pagination : types.IPagination) : ISetOccurrences => ({type: types.SET_OCCURRENCES, payload: occurs, page: pagination});

export const refreshOccurrences = (occurs : types.IOccurrence[], pagination : types.IPagination) : IRefreshOccurrences => ({type: types.REFRESH_OCCURRENCES, payload: occurs, page: pagination});

export const setTags = (tags : types.ITags[]) : ISetTags => ({type: types.SET_TAGS, payload: tags});

export const advancedSearchOccurrences = (occurs : types.IOccurrence[], pagination : types.IPagination) : IAdvancedSearchOccurrences => ({type: types.ADVANCED_SEARCH_OCCURRENCES, payload: occurs, page: pagination});

export const loadMoreAdvancedSearchOccurrences = (occurs : types.IOccurrence[], pagination : types.IPagination) : ILoadMoreAdvancedSearchOccurrences => ({type: types.LOADMORE_ADVANCED_SEARCH_OCCURRENCES, payload: occurs, page: pagination});

export const requestOccurrences = () : IRequestOccurrences => ({type: types.REQUEST_OCCURRENCES});

export const requestAdvSearch = () : IRequestAdvSearch => ({type: types.REQUEST_ADVSEARCH});

export const resetSearchResults = () : IResetSearchResults => ({type: types.RESET_SEARCH_RESULT});

export default {
  setOccurrences,
  refreshOccurrences,
  setTags,
  advancedSearchOccurrences,
  loadMoreAdvancedSearchOccurrences,
  requestOccurrences,
  requestAdvSearch,
  resetSearchResults
};
