import axios from 'axios';
import { CREATE_ARTICLE, BASE_URL } from '../constants';
import { successToast, errorToast } from '../../helpers';

/*
 * dispatches the action type CREATE_ARTICLE_SUCCESS type on success
 */
export const createArticleSuccess = response => ({
  type: `${CREATE_ARTICLE}_SUCCESS`,
  response,
});

  /*
   * dispatches the action type CREATE_ARTICLE_FAILURE type on failure
   */
export const createArticleFailure = error => ({
  type: `${CREATE_ARTICLE}_FAILURE`,
  error,
});

/*
 * Defines the Create Article actions:
 * dispatches createArticleSuccess on success
 * dispatches createArticleFailure on failure
 */

const config = {
  headers: { Authorization: localStorage.getItem('token') },
};

export const createArticle = (data, history) => async dispatch => {
  const url = `${BASE_URL}/articles/`;
  dispatch({ type: CREATE_ARTICLE });
  return axios
    .post(url, data, config)
    .then(response => {
      dispatch(createArticleSuccess(response));
      successToast('Your article has been published!');
      history.push('/');
    })
    .catch(error => {
      dispatch(createArticleFailure(error));
      if (error.response.data && error.response.data.error) {
        errorToast(error.response.data.error);
      }
    });
};
