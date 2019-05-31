import { LOGIN_USER } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { successToast, errorToast } from '../../helpers';

export const loginUser = (data, history) => {
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    axios
      .post('http://127.0.0.1:8000/api/users/login/', data)
      .then(response => {
        dispatch(loginSuccess(response.data));

        successToast('Welcome ' + response.data.user.username);
        history.push('/');
      })
      .catch(error => {
        dispatch(loginFailure(error));
        errorToast(error.response.data.errors.error[0]);
      });
  };
};

export const logoutUser = () => {
  return dispatch => {
    dispatch(logout());
  };
};

export const loginSuccess = response => ({
  type: `${LOGIN_USER}_SUCCESS`,
  response
});

export const loginFailure = error => ({
  type: `${LOGIN_USER}_FAILURE`,
  error
});

export const logout = () => ({
  type: `${LOGIN_USER}_LOGOUT`
});
