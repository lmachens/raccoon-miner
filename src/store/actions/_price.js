import { RECEIVE_PRICE } from '../types';
import { getPrice } from '../../api/cryptocompare';

const fetchPrice = () => {
  return dispatch => {
    getPrice().then(result => {
      dispatch({
        type: RECEIVE_PRICE,
        data: {
          price: result
        }
      });
    });
  };
};

export const trackPrice = () => {
  return dispatch => {
    dispatch(fetchPrice());
    setInterval(() => {
      dispatch(fetchPrice());
    }, 180000);
  };
};
