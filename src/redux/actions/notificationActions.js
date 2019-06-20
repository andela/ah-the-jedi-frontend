import axios from 'axios';
import { NOTIFICATIONS, BASE_URL, headers } from '../constants';
import { errorToast } from '../../helpers';

/*
 *Defines the action types for successful read notification fetch
 */
export const fetchSuccess = response => ({
  type: `${NOTIFICATIONS}_SUCCESS`,
  response,
});

/*
 *Defines the action types for successful unread notification fetch
 */
export const fetchUnreadSuccess = response => ({
  type: `UNREAD_${NOTIFICATIONS}_SUCCESS`,
  response,
});

/*
 *Defines the action types for unsuccessful notifications fetch
 */
export const fetchFail = error => ({
  type: `${NOTIFICATIONS}_FAILURE`,
  error,
});

/*
 *Defines the action types for marking notifications as read
 */
export const markRead = () => ({
  type: `READ_${NOTIFICATIONS}_SUCCESS`,
});

/*
 *Defines the fetchUnreadNotifications actions and dispatches the right
 *action for either success >>fetchSuccess() or
 *failure >>fetchFail()
 */

export const fetchUnreadNotifications = (history = '') => dispatch => {
  dispatch({ type: NOTIFICATIONS });
  return axios
    .get(`${BASE_URL}/notifications/unread?limit=100`, headers(localStorage.getItem('token')))
    .then(response => {
      dispatch(fetchUnreadSuccess(response.data.notifications));
    })
    .catch(error => {
      dispatch(fetchFail(error.response.data.error));

      localStorage.clear();
      errorToast('Please log in to continue');
      history.push('/login');
    });
};

/*
 *Defines the fetchAllNotifications actions and dispatches the right
 *action for either success >>fetchSuccess() or
 *failure >>fetchFail()
 */

export const fetchAllNotifications = (history = '') => dispatch => {
  dispatch({ type: NOTIFICATIONS });
  return axios
    .get(`${BASE_URL}/notifications/all?limit=100`, headers(localStorage.getItem('token')))
    .then(response => {
      dispatch(fetchSuccess(response.data.notifications));
    })
    .catch(error => {
      dispatch(fetchFail(error.response.data.error));

      localStorage.clear();
      errorToast('Please log in to continue');
      history.push('/login');
    });
};

/*
 *Defines the setRead actions and dispatches the right
 *action for either success >>bookmarkSuccess() or
 *failure >>markBookmarked()
 */

export const setRead = (id, history = '') => dispatch => {
  dispatch({ type: NOTIFICATIONS });
  return axios
    .put(`${BASE_URL}/notifications/read/${id}`, null, headers(localStorage.getItem('token')))
    .then(response => {
      dispatch(markRead(response.data.data));
    })
    .catch(error => {
      dispatch(fetchFail(error.response.data.error));
      if (error.response.data && error.response.data.detail) {
        localStorage.clear();
        errorToast('Please log in to continue');
        history.push('/login');
      } else {
        errorToast(error.response.data.error);
      }
    });
};
