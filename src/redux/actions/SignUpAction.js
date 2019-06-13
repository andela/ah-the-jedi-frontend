import axios from 'axios';
import { SIGNUP_USER, BASE_URL } from '../constants';
import { async } from 'q';

/*
 * Defines the Account activation actions:
 * dispatches verificationSent on success
 * dispatches verificationFailure on failure
 */
export const signUpUser = data => async dispatch => {
  dispatch({ type: SIGNUP_USER });
  return axios
    .post(`${BASE_URL}/users/`, data)
    .then(response => {
      dispatch(verificationSent(response));
      window.location.pathname = '/emailsent';
    })
    .catch(error => {
      dispatch(verificationFailure(error));
    });
};

/*
 * dispatches the action type SIGN_UP_SEND_VERIFICATION_SUCCESS type on success
 */
export const verificationSent = response => ({
  type: `${SIGNUP_USER}_SEND_VERIFICATION_SUCCESS`,
  response,
});

/*
 * dispatches the action type SIGN_UP_SEND_VERIFICATION_FAILURE type on success
 */
export const verificationFailure = error => ({
  type: `${SIGNUP_USER}_SEND_VERIFICATION_FAILURE`,
  error,
});

export const socialAction = data => ({
  type: `${SIGNUP_USER}_SOCIAL`,
  data,
});
