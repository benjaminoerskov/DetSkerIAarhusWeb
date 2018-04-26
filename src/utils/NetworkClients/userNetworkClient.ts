import {IRegisterUser, IUser} from '../../state/ducks/user/types';
import {NetworkClient} from '../networkClient';

class UserNetworkClient extends NetworkClient < IUser > {
  public registerPostAsync(uri : string, newUser : IRegisterUser) {
    try {
      const req = {
        body: JSON.stringify(newUser),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Secret': 'herpderp',


        }
      };
      return fetch(uri, req);
    } catch (error) {
      throw error;
    }
  }

  
}

const userNetworkClient = new UserNetworkClient();
export default userNetworkClient;
