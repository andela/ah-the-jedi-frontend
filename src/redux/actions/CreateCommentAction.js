import axios from 'axios';
import { fetchCommentsAction } from './FetchCommentsAction';
import { BASE_URL, CREATE_COMMENT } from '../constants';
import { successToast, errorToast } from '../../helpers';

/*
 *Defines the create_comment actions and dispatches the right
 *action for either success >>createCommentSuccess() or
 *failure >>createCommentFailure()
 */
const token = {
  headers: { Authorization: localStorage.getItem('token') },
};

export const createComment = (data, slug, history) => async dispatch => {
  dispatch({ type: CREATE_COMMENT });
  return axios
    .post(`${BASE_URL}/articles/${slug}/comments/`, data, token)
    .then(response => {
      dispatch(createCommentSuccess(response.data));
      successToast('Comment posted successfully');

      dispatch(fetchCommentsAction(slug, history));
    })
    .catch(error => {
      dispatch(createCommentFailure(error));
    });
};

export const createThreadComment = (data, slug, history) => async dispatch => {
  dispatch({ type: CREATE_COMMENT });
  const id = Number(data.id);
  return axios
    .post(`${BASE_URL}/articles/${slug}/comments/?parent_id=${id}`, data, token)
    .then(response => {
      dispatch(createCommentSuccess(response.data));
      successToast('Comment posted successfully');
      dispatch(fetchCommentsAction(slug, history));
    })
    .catch(error => {
      dispatch(createCommentFailure(error));
    });
};

/*
 *Defines the action types for successful comment creation
 */
export const createCommentSuccess = response => ({
  type: `${CREATE_COMMENT}_SUCCESS`,
  response,
});

/*
 *Defines the action types for unsuccessful comment creation
 */
export const createCommentFailure = error => ({
  type: `${CREATE_COMMENT}_FAILURE`,
  error,
});
