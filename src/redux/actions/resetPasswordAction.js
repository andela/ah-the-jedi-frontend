import axios from 'axios';
import { successToast, errorToast } from '../../helpers/toastify';
import { RESET_PASSWORD, BASE_URL } from '../constants';


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
  return axios
    .post(`${BASE_URL}/users/reset_password/`, data)
    .then((response) => {
      dispatch(resetPasswordSuccess(response.data));
      successToast(
        'Password reset link has been sent to your email, check your email for instructions on how to change password',
      );
    })
    .catch((error) => {
      dispatch(resetPasswordFailure(error));
      errorToast(
        'User with this email not found',
      );
    });
};
