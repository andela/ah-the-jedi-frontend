import axios from 'axios';
import { RESET_PASSWORD } from '../constants';

export const resetPasswordSuccess = response => ({
  type: `${RESET_PASSWORD}_SUCCESS`,
  response,
});

export const resetPasswordFailure = error => ({
  type: `${RESET_PASSWORD}_FAILURE`,
  error,
});

export const resetPassword = data => (dispatch) => {
  dispatch({ type: RESET_PASSWORD });
  axios
    .post(
      'https://ah-the-jedi-backend-staging.herokuapp.com/api/users/reset_password/',
      data,
    )
    .then((response) => {
      dispatch(resetPasswordSuccess(response.data));
    })
    .catch((error) => {
      dispatch(resetPasswordFailure(error));
    });
};
