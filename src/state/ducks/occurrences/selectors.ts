import { IOccurrencesState } from './reducers';

export const getOccurrencesViewState = (state: IOccurrencesState) => ({
  occurrences: state.occurs,
  tags: state.tags,
  advSearchOccurs: state.advSearchOccurs,
  pagination: state.pagination,
  searchPagination: state.searchPagination,
});
