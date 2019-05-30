import axios from 'axios';
import { SIGNUP_USER, BASE_URL } from '../constants';

/*
 * Defines the Account activation actions:
 * dispatches signUpActivateSuccess on success
 * dispatches activationFailure on failure
 */
export const activateUser = (id, token) => dispatch => {
  const url = `${BASE_URL}/users/activate/?uid=${id}&token=${token}`;
  axios
    .post(url)
    .then(response => {
      dispatch(signUpActivateSuccess(response));
    })
    .catch(error => {
      dispatch(activationFailure(error));
    });
};

/*
 * dispatches the action type SIGN_UP_USER_ACTIVATION_SUCCESS type on success
 */
export const signUpActivateSuccess = response => ({
  type: `${SIGNUP_USER}_ACTIVATION_SUCCESS`,
  response,
});

/*
 * dispatches the action type SIGN_UP_USER_ACTIVATION_FAILURE type on success
 */
export const activationFailure = response => ({
  type: `${SIGNUP_USER}_ACTIVATION_FAILURE`,
  response,
});
