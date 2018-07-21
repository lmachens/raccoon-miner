import { RECEIVE_PROFITABILITY } from '../types';
import { getProfitability } from '../../api/nice-hash';

const fetchProfitability = () => {
  return dispatch => {
    getProfitability().then(result => {
      dispatch({
        type: RECEIVE_PROFITABILITY,
        data: {
          profitability: result
        }
      });
    });
  };
};

export const trackProfitability = () => {
  return dispatch => {
    dispatch(fetchProfitability());
    setInterval(() => {
      dispatch(fetchProfitability());
    }, 180000);
  };
};
