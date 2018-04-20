import {IPlace} from '../../state/ducks/occurrences/types';
import {NetworkClient} from '../networkClient';

class PlacesNetworkClient extends NetworkClient < IPlace > {}

const placesNetworkClient = new PlacesNetworkClient();
export default placesNetworkClient;
