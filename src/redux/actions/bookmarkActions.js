import axios from 'axios';
import { BOOKMARK, BASE_URL, headers } from '../constants';
import { errorToast } from '../../helpers';

/*
 *Defines the action types for successful article bookmark
 */
export const bookmarkSuccess = response => ({
  type: `${BOOKMARK}_SUCCESS`,
  response,
});

/*
 *Defines the action types for successful fetch of bookmark
 */
export const fetchSuccess = response => ({
  type: `FETCH_${BOOKMARK}_SUCCESS`,
  response,
});

/*
 *Defines the action types for successful article unbookmark
 */
export const unbookmarkSuccess = response => ({
  type: `UN${BOOKMARK}_SUCCESS`,
  response,
});

/*
 *Defines the action types for marking existing bookmark
 */
export const markBookmarked = () => ({
  type: `MARK_${BOOKMARK}_SUCCESS`,
});

/*
 *Defines the action types for unsuccessful article bookmark
 */
export const bookmarkFail = error => ({
  type: `${BOOKMARK}_FAILURE`,
  error,
});

/*
 *Defines the bookmarkArticle actions and dispatches the right
 *action for either success >>bookmarkSuccess() or
 *failure >>bookmarkFail()
 */

export const bookmarkArticle = (slug, history = '') => dispatch => {
  dispatch({ type: BOOKMARK });
  return axios
    .post(`${BASE_URL}/articles/${slug}/bookmark/`, null, headers(localStorage.getItem('token')))
    .then(response => {
      dispatch(bookmarkSuccess(response.data.data));
    })
    .catch(error => {
      dispatch(bookmarkFail(error.response.data.error));
      if (error.response.data && error.response.data.detail) {
        localStorage.clear();
        history.push('/login');
        errorToast('Please log in to continue');
      } else {
        errorToast(error.response.data.error);
      }
    });
};

/*
 *Defines the setBookmarked actions and dispatches the right
 *action for either success >>bookmarkSuccess() or
 *failure >>markBookmarked()
 */

export const setBookmarked = slug => dispatch => {
  dispatch({ type: BOOKMARK });
  return axios
    .post(`${BASE_URL}/articles/${slug}/bookmark/`, null, headers(localStorage.getItem('token')))
    .catch(error => {
      dispatch(markBookmarked(error.response.data.error));
    });
};

/*
 *Defines the fetchBookmark actions and dispatches the right
 *action for either success >>fetchSuccess() or
 *failure >>fetchFail()
 */

export const fetchBookmark = slug => dispatch => {
  dispatch({ type: BOOKMARK });
  return axios
    .get(`${BASE_URL}/articles/${slug}/bookmark/`, headers(localStorage.getItem('token')))
    .then(response => {
      dispatch(fetchSuccess(response.data.data));
    })
    .catch(error => {
      dispatch(bookmarkFail(error.response.data));
    });
};

/*
 *Defines the unbookmarkArticle actions and dispatches the right
 *action for either success >>unbookmarkSuccess() or
 *failure >>bookmarkFail()
 */

export const unbookmarkArticle = slug => dispatch => {
  dispatch({ type: `UN${BOOKMARK}` });
  return axios
    .delete(`${BASE_URL}/articles/${slug}/bookmark/`, headers(localStorage.getItem('token')))
    .then(response => {
      dispatch(unbookmarkSuccess(response.data.data));
    })
    .catch(error => {
      dispatch(bookmarkFail(error.response.data.error));
    });
};
