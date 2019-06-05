import axios from 'axios';
import { successToast, errorToast } from '../../helpers/toastify';
import { PASSWORD_CONFIRM, BASE_URL } from '../constants';

export const passwordConfirmSuccess = response => ({
  type: `${PASSWORD_CONFIRM}_SUCCESS`,
  response,
  isError: false,
});

export const passwordConfirmFailure = error => ({
  type: `${PASSWORD_CONFIRM}_FAILURE`,
  error,
  isError: true,
});

export const passwordConfirm = data => (dispatch) => {
  const getUrlParams = new URL(window.location.href);
  const uid = getUrlParams.searchParams.get('uid');
  const token = getUrlParams.searchParams.get('token');
  dispatch({ type: PASSWORD_CONFIRM });
  return axios
    .patch(`${BASE_URL}/users/reset_password_confirm/?uid=${uid}&token=${token}`, data)
    .then((response) => {
      dispatch(passwordConfirmSuccess(response.data));
      successToast('Password reset successfully.');
    })
    .catch((error) => {
      dispatch(passwordConfirmFailure(error));
      if (error.response.data.errors) {
        errorToast('Kindly resend password change request again');
      } else if (error.response.data.user) {
        errorToast('Password must be alphanumeric with a minimum of 8 characters.');
      }
    });
};
