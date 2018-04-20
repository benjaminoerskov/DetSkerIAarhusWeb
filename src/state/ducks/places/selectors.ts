import {IPlacesState} from './reducers';

export const getPlacesViewState = (state : IPlacesState) => ({places: state.places});
