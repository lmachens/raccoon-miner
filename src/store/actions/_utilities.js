import { RECEIVE_VERSION } from '../types';
import { getVersion } from '../../api/utilities';

export const fetchVersion = () => {
  return dispatch => {
    getVersion().then(version => {
      dispatch({
        type: RECEIVE_VERSION,
        data: version
      });
    });
  };
};
