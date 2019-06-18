import axios from 'axios';
import { GET_FOLLOWERS, GET_FOLLOWING, BASE_URL, GET_PROFILE, headers } from '../constants';
import { errorToast } from '../../helpers';

export const getFollowersSuccess = response => ({
  type: `${GET_FOLLOWERS}_SUCCESS`,
  response,
});

export const getFollowingSuccess = response => ({
  type: `${GET_FOLLOWING}_SUCCESS`,
  response,
});

export const getProfileSuccess = response => ({
  type: `${GET_PROFILE}_SUCCESS`,
  response,
});

export const getProfileFailure = response => ({
  type: `${GET_PROFILE}_FAILURE`,
  response,
});

export const getFollowersFailure = response => ({
  type: `${GET_FOLLOWERS}_FAILURE`,
  response,
});

export const getFollowingFailure = response => ({
  type: `${GET_FOLLOWING}_FAILURE`,
  response,
});

export const getFollowers = token => dispatch => {
  dispatch({ type: GET_FOLLOWERS });

  return axios
    .get('https://ah-the-jedi-backend-staging.herokuapp.com/api/user/followers', headers(token))
    .then(response => {
      dispatch(getFollowersSuccess(response));
    })
    .catch(error => {
      dispatch(getFollowersFailure(error));
    });
};

export const getFollowing = token => dispatch => {
  dispatch({ type: GET_FOLLOWING });

  return axios
    .get('https://ah-the-jedi-backend-staging.herokuapp.com/api/user/following', headers(token))
    .then(response => {
      dispatch(getFollowingSuccess(response));
    })
    .catch(error => {
      dispatch(getFollowingFailure(error));
    });
};

export const FetchUserprofile = (username, token) => {
  try {
    return axios.get(`${BASE_URL}/profiles/${username}`, headers(token));
  } catch (err) {
    errorToast('Oops! something went wrong, please try again');
  }
};
