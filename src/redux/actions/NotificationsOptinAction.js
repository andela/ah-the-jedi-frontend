import axios from 'axios';
import { BASE_URL, OPTINOUT, headers } from '../constants';
import { successToast, errorToast } from '../../helpers';

const config = {
  headers: { Authorization: localStorage.getItem('token') },
};

export const OptInOutAction = data => async dispatch => {
  dispatch({ type: OPTINOUT });
  return axios
    .put(`${BASE_URL}/notifications/subscriptions`, data, config)
    .then(response => {
      dispatch(optInOutSuccess(response.data));
    })
    .catch(error => {
      dispatch(optInOutFailure(error));
    });
};

export const NotifyStatusAction = () => async dispatch => {
  dispatch({ type: OPTINOUT });
  return axios
    .get(`${BASE_URL}/notifications/subscriptions`, config)
    .then(response => {
      dispatch(optInOutSuccess(response.data));
    })
    .catch(error => {
      dispatch(optInOutFailure(error));
    });
};

export const optInOutSuccess = response => ({
  type: `${OPTINOUT}_SUCCESS`,
  response,
});

export const optInOutFailure = error => ({
  type: `${OPTINOUT}_FAILURE`,
  error,
});
