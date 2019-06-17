import axios from 'axios';
import { LOGIN_USER, SIGNUP_USER, BASE_URL } from '../constants';
import { successToast, errorToast } from '../../helpers';

import { socialAction } from './SignUpAction';

/*
 *Defines the action types for successful login
 */
export const loginSuccess = response => ({
  type: `${LOGIN_USER}_SUCCESS`,
  response,
});

/*
 *Defines the action types for successful social login
 */
export const loginSuccessSocial = response => ({
  type: `${LOGIN_USER}_SUCCESS_SOCIAL`,
  response,
});

/*
 *Defines the action types for unsuccessful login
 */
export const loginFailure = error => ({
  type: `${LOGIN_USER}_FAILURE`,
  error,
});

/*
 *Defines the action types for loggin out user
 */
export const logout = () => ({
  type: `${LOGIN_USER}_LOGOUT`,
});

/*
 *Defines the loginUser actions and dispatches the right
 *action for either success >>loginSuccess() or
 *failure >>loginfailure() or
 */
export const loginUser = (data, history) => dispatch => {
  dispatch({ type: LOGIN_USER });
  return axios
    .post(`${BASE_URL}/users/login/`, data)
    .then(response => {
      dispatch(loginSuccess(response.data));

      successToast(`Welcome ${response.data.user.username}`);
      history.push('/');
    })
    .catch(error => {
      dispatch(loginFailure(error));
    });
};

/*
 *Defines the actions for social login and dispatches the right
 *action for either success >>loginSuccessSocial() or
 *failure >>loginfailure() or
 */
export const UserSocialLogin = (data, history) => dispatch => {
  dispatch({ type: LOGIN_USER });
  dispatch({ type: SIGNUP_USER });
  return axios
    .post(`${BASE_URL}/users/social/login/`, data)
    .then(response => {
      dispatch(loginSuccessSocial(response.data));
      dispatch(socialAction(response.data));
      successToast(`Welcome ${response.data.username}`);
      history.push('/');
    })
    .catch(err => {
      dispatch(loginFailure(err));
      errorToast('Oops! something went wrong, please try again');
      dispatch(socialAction(err));
    });
};
/*
 *Defines the logout actions and dispatches the
 *logout user action
 */
export const logoutUser = () => dispatch => dispatch(logout());
