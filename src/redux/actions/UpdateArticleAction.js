import axios from 'axios';
import { UPDATE_ARTICLE, GET_ONE_ARTICLE, BASE_URL } from '../constants';
import { successToast, errorToast } from '../../helpers';

/*
 * dispatches the action type GET_ONE_ARTICLE_SUCCESS type on success
 */
export const getOneArticleSuccess = response => ({
  type: `${GET_ONE_ARTICLE}_SUCCESS`,
  response,
});

  /*
   * dispatches the action type GET_ONE_ARTICLE_FAILURE type on failure
   */
export const getOneArticleFailure = error => ({
  type: `${GET_ONE_ARTICLE}_FAILURE`,
  error,
});

  /*
   * dispatches the action type UPDATE_ARTICLE_SUCCESS type on success
   */
export const updateArticleSuccess = response => ({
  type: `${UPDATE_ARTICLE}_SUCCESS`,
  response,
});

  /*
   * dispatches the action type UPDATE_ARTICLE_FAILURE type on failure
   */
export const updateArticleFailure = error => ({
  type: `${UPDATE_ARTICLE}_FAILURE`,
  error,
});


/*
 * Defines the Update Article actions:
 * dispatches getOneArticleSuccess on success
 * dispatches getOneArticleFailure on failure
 * dispatches createArticleSuccess on success
 * dispatches createArticleFailure on failure
 */

const config = {
  headers: { Authorization: localStorage.getItem('token') },
};

export const getSingleArticle = (slug, history) => async dispatch => {
  const url = `${BASE_URL}/articles/${slug}/`;
  dispatch({ type: GET_ONE_ARTICLE });
  return axios
    .get(url)
    .then(response => {
      dispatch(getOneArticleSuccess(response));
    })
    .catch(error => {
      dispatch(getOneArticleFailure(error));
      history.push('/notfound');
    });
};

export const updateArticle = (data, slug, history) => async dispatch => {
  const url = `${BASE_URL}/articles/${slug}/`;
  dispatch({ type: UPDATE_ARTICLE });
  return axios
    .put(url, data, config)
    .then(response => {
      dispatch(updateArticleSuccess(response));
      successToast('Your article has been updated!');
      history.push('/');
    })
    .catch(error => {
      dispatch(updateArticleFailure(error));
      if (error.response.data && error.response.data.error) {
        errorToast(error.response.data.error);
      }
    });
};
