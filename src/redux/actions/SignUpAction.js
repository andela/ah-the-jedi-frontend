import axios from 'axios';
import { SIGNUP_USER, BASE_URL } from '../constants';

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

const verificationSent = response => ({
  type: `${SIGNUP_USER}_SEND_VERIFICATION_SUCCESS`,
  response,
});

const verificationFailure = error => ({
  type: `${SIGNUP_USER}_SEND_VERIFICATION_FAILURE`,
  error,
});
