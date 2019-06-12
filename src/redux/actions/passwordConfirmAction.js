import axios from 'axios';
import { successToast } from '../../helpers/toastify';
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

export const passwordConfirm = (data, history) => dispatch => {
  const getUrlParams = new URL(window.location.href);
  const uid = getUrlParams.searchParams.get('uid');
  const token = getUrlParams.searchParams.get('token');
  dispatch({ type: PASSWORD_CONFIRM });
  return axios
    .patch(`${BASE_URL}/users/reset_password_confirm/?uid=${uid}&token=${token}`, data)
    .then(response => {
      dispatch(passwordConfirmSuccess(response.data));
      successToast('Password reset successfully.');
      history.push('/login');
    })
    .catch(error => {
      dispatch(passwordConfirmFailure(error));
    });
};
