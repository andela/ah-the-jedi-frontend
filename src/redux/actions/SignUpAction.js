import axios from 'axios';
import { SIGNUP_USER, BASE_URL } from '../constants';

/*
 * dispatches the action type SIGN_UP_SEND_VERIFICATION_SUCCESS type on success
 */
export const verificationSent = response => ({
  type: `${SIGNUP_USER}_SEND_VERIFICATION_SUCCESS`,
  response,
});

/*
 * dispatches the action type SIGN_UP_SEND_VERIFICATION_FAILURE type on failure
 */
export const verificationFailure = error => ({
  type: `${SIGNUP_USER}_SEND_VERIFICATION_FAILURE`,
  error,
});

export const socialAction = data => ({
  type: `${SIGNUP_USER}_SOCIAL`,
  data,
});

/*
 * Defines the Account activation actions:
 * dispatches verificationSent on success
 * dispatches verificationFailure on failure
 */
export const signUpUser = data => dispatch => {
  dispatch({ type: SIGNUP_USER });
  axios
    .post(`${BASE_URL}/users/`, data)
    .then(response => {
      dispatch(verificationSent(response));
      window.location.pathname = '/emailsent';
    })
    .catch(error => {
      dispatch(verificationFailure(error));
    });
};
