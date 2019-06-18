import axios from 'axios';
import { FOLLOW_USER, UNFOLLOW_USER, BASE_URL, headers } from '../constants';

export const followSuccess = response => ({
  type: `${FOLLOW_USER}_SUCCESS`,
  response,
});

export const unfollowSucess = response => ({
  type: `${UNFOLLOW_USER}_SUCCESS`,
  response,
});

export const followFailure = response => ({
  type: `${FOLLOW_USER}_FAILURE`,
  response,
});

export const unfollowFailure = response => ({
  type: `${UNFOLLOW_USER}_FAILURE`,
  response,
});

export const userFollow = (username, token) => dispatch => {
  dispatch({ type: FOLLOW_USER });
  return axios
    .post(`${BASE_URL}/profiles/${username}/follow`, null, headers(token))
    .then(response => {
      dispatch(followSuccess(response));
    })
    .catch(error => {
      dispatch(followFailure(error));
    });
};

export const userUnFollow = (username, token) => dispatch => {
  dispatch({ type: UNFOLLOW_USER });
  return axios
    .delete(`${BASE_URL}/profiles/${username}/unfollow`, headers(token))
    .then(response => {
      dispatch(unfollowSucess(response));
    })
    .catch(error => {
      dispatch(unfollowFailure(error));
    });
};
