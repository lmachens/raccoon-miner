import { RECEIVE_OVERWOLF_USER, RECEIVE_VERSION } from '../types';
import { getOverwolfUser, getVersion } from '../../api/utilities';

export const fetchOverwolfUser = () => {
  return dispatch => {
    getOverwolfUser().then(overwolfUser => {
      dispatch({
        type: RECEIVE_OVERWOLF_USER,
        data: overwolfUser
      });
      Raven.setUserContext(overwolfUser);
    });
  };
};

export const fetchVersion = () => {
  return dispatch => {
    getVersion().then(version => {
      dispatch({
        type: RECEIVE_VERSION,
        data: version
      });
      Raven.setRelease(version);
    });
  };
};
