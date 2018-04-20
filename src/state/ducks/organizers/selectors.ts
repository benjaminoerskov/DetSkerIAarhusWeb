import {IOrganizersState} from './reducers';

export const getOrganizersViewState = (state : IOrganizersState) => ({organizers: state.organizers});
