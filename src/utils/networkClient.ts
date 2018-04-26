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
          'X-Secret': 'herpderp',
          Authorization: "Bearer " + window.localStorage.getItem("token")
        },
        body: JSON.stringify(obj),
      };

      return fetch(uri, req);
    } catch (error) {
      throw error;
    }
  }

  public deleteAsync(uri : string, obj : object) {
    try {
      const req : RequestInit = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Secret': 'herpderp',
          Authorization: "Bearer " + window.localStorage.getItem("token")
        },
        body: JSON.stringify(obj),
      };

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
