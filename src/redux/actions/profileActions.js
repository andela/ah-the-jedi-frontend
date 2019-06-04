import axios from 'axios';
import { FETCH_PROFILE, BASE_URL, headers } from '../constants';

/*
 *Defines the action types for successful profile fetch
 */

export const fetchSuccess = response => ({
  type: `${FETCH_PROFILE}_SUCCESS`,
  response,
});

/*
 *Defines the action types for unsuccessful profile fetch
 */
export const fetchFail = error => ({
  type: `${FETCH_PROFILE}_FAILURE`,
  error,
});

/*
 *Defines the fetchProfile actions and dispatches the right
 *action for either success >>fetchSuccess() or
 *failure >>fetchFail()
 */

export const fetchProfile = (username, history) => (dispatch) => {
  dispatch({ type: FETCH_PROFILE });
  axios
    .get(`${BASE_URL}/profiles/${username}`, headers(localStorage.getItem('token')))
    .then((response) => {
      dispatch(fetchSuccess(response.data.profile));
    })
    .catch((error) => {
      dispatch(fetchFail(error.response.data.errors));
      history.push(`/notfound@${username}`);
    });
};

/*
 *Defines the updateProfile actions and dispatches the right
 *action for either success >>fetchSuccess() or
 *failure >>fetchFail()
 */

export const updateProfile = (username, data) => (dispatch) => {
  dispatch({ type: FETCH_PROFILE });
  axios
    .put(`${BASE_URL}/profiles/${username}`, data, headers(localStorage.getItem('token')))
    .then((response) => {
      dispatch(fetchSuccess(response.data.profile));
    })
    .catch((error) => {
      dispatch(fetchFail(error.response.data.errors));
    });
};
