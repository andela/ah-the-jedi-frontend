import axios from 'axios';
import { PASSWORD_CONFIRM } from '../constants';

export const passwordConfirmSuccess = response => ({
  type: `${PASSWORD_CONFIRM}_SUCCESS`,
  response,
  isError: false
});

export const passwordConfirmFailure = error => ({
  type: `${PASSWORD_CONFIRM}_FAILURE`,
  error,
  isError: true
});

// const getUrlParams = new URL(window.location.href);
// const uid = getUrlParams.searchParams.get()


export const passwordConfirm = data => (dispatch) => {
  const getUrlParams = new URL(window.location.href);
  const uid = getUrlParams.searchParams.get('uid');
  const token = getUrlParams.searchParams.get('token');
  dispatch({ type: PASSWORD_CONFIRM });
  axios
    .patch(
      `http://127.0.0.1:8000/api/users/reset_password_confirm/?uid=${uid}&token=${token}`,
      data,
    )
    .then((response) => {
      dispatch(passwordConfirmSuccess(response.data));
    })
    .catch((error) => {
      dispatch(passwordConfirmFailure(error));
    });
};
