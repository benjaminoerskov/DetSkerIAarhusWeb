import {IOccurrence} from '../state/ducks/occurrences/types';

export abstract class NetworkClient < T > {
  public getAsync(uri : string, obj : object) {
    try {
      return fetch(uri, obj);
    } catch (error) {
      throw error;
    }
  }

  public postAsync(uri : string, obj : object) {
    try {
      const req : RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Secret': 'herpderp'
        },
        body: JSON.stringify(obj),
      };
      // tslint:disable-next-line:no-console
      console.log(req);
      return fetch(uri, req);
    } catch (error) {
      throw error;
    }
  }
}

//
// tslint:disable-next-line:max-classes-per-file
class OccurrencesNetworkClient extends NetworkClient < IOccurrence > {}

const occurrencesNetworkClient = new OccurrencesNetworkClient();
export default occurrencesNetworkClient;
