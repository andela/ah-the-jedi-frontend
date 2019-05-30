import axios from 'axios';
import { SIGNUP_USER, BASE_URL } from '../constants';

export const activateUser = (id, token) => dispatch => {
  const url = `${BASE_URL}/users/activate/?uid=${id}&token=${token}`;
  axios
    .post(url)
    .then(response => {
      dispatch(signUpActivateSuccess(response));
      console.log(response);
    })
    .catch(error => {
      dispatch(activationFailure(error));
    });
};

const signUpActivateSuccess = response => ({
  type: `${SIGNUP_USER}_ACTIVATION_SUCCESS`,
  response,
});

const activationFailure = response => ({
  type: `${SIGNUP_USER}_ACTIVATION_FAILURE`,
  response,
});
