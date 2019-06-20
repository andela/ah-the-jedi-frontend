import axios from 'axios';
import {
  FETCH_ARTICLES, DELETE_ARTICLE, BASE_URL, LIKE_ARTICLE, DISLIKE_ARTICLE,
} from '../constants';
import { successToast } from '../../helpers';

/*
 *Defines the action types for successful all articles fetch
 */
export const fetchSuccess = response => ({
  type: `${FETCH_ARTICLES}_SUCCESS`,
  response,
});

/*
 *Defines the action types for unsuccessful fetch one articles fetch
 */
export const fetchFailure = error => ({
  type: `${FETCH_ARTICLES}_FAILURE`,
  error,
});

/*
 *Defines the action types for successful fetch one articles fetch
 */
export const fetchOneSuccess = response => ({
  type: `${FETCH_ARTICLES}_SUCCESS_FOR_ONE`,
  response,
});

export const fetchOneFailure = error => ({
  type: `${FETCH_ARTICLES}_FAILURE_FOR_ONE`,
  error,
});

/*
 *Defines the action types for successful fetch for author
 */
export const fetchByAuthorSuccess = response => ({
  type: `${FETCH_ARTICLES}_SUCCESS_FOR_AUTHOR`,
  response,
});

/*
 *Defines the action types for successful like of articles
 */
export const likeArticleSuccess = response => ({
  type: `${LIKE_ARTICLE}_SUCCESS`,
  response,
});

/*
 *Defines the action types for failure like of articles
 */
export const likeArticleFailure = error => ({
  type: `${LIKE_ARTICLE}_FAILURE`,
  error,
});

/*
 *Defines the action types for successful dislike of article
 */
export const dislikeArticleSuccess = response => ({
  type: `${DISLIKE_ARTICLE}_SUCCESS`,
  response,
});

/*
 *Defines the action types for failure dislike of article
 */
export const dislikeArticleFailure = error => ({
  type: `${DISLIKE_ARTICLE}_FAILURE`,
  error,
});

/*
 *Defines the action types for unsuccessful fetch article for author
 */
export const fetchByAuthorFailure = error => ({
  type: `${FETCH_ARTICLES}_FAILURE_FOR_AUTHOR`,
  error,
});

/*
 *Defines the action types for successful delete article by author
 */
export const deleteArticleSuccess = response => ({
  type: `${DELETE_ARTICLE}_SUCCESS`,
  response,
});

/*
 *Defines the action types for unsuccessful delete article by author
 */
export const deleteArticleFailure = error => ({
  type: `${DELETE_ARTICLE}_FAILURE`,
  error,
});

/*
 *Defines the fetchArticles actions and dispatches the right
 *action for either success
 *failure
 */
export const fetchArticles = url => dispatch => {
  dispatch({ type: FETCH_ARTICLES });
  return axios
    .get(url)
    .then(response => {
      dispatch(fetchSuccess(response));
    })
    .catch(error => {
      dispatch(fetchFailure(error));
    });
};

const config = {
  headers: { Authorization: localStorage.getItem('token') },
};

/*
 *Defines the fetchOneArticle actions and dispatches the right
 *action for either success
 *failure
 */
export const fetchOneArticle = (slug, history) => dispatch => {
  dispatch({ type: FETCH_ARTICLES });
  return axios
    .get(`${BASE_URL}/articles/${slug}/`, config)
    .then(response => {
      dispatch(fetchOneSuccess(response));
    })
    .catch(error => {
      dispatch(fetchOneFailure(error));
      history.push(`/notfound/${slug}`);
    });
};

/*
 *Defines the fetchByAuthor actions and dispatches the right
 *action for either success
 *failure
 */
export const fetchByAuthor = author => dispatch => {
  dispatch({ type: FETCH_ARTICLES });
  return axios
    .get(`${BASE_URL}/article/search/?author=${author}`)
    .then(response => {
      dispatch(fetchByAuthorSuccess(response));
    })
    .catch(error => {
      dispatch(fetchByAuthorFailure(error));
    });
};

/*
 *Defines the deleteArticle actions and dispatches the right
 *action for either success
 *failure
 */
export const deleteArticle = (slug, history) => dispatch => {
  dispatch({ type: DELETE_ARTICLE });
  return axios
    .delete(`${BASE_URL}/articles/${slug}/`, config)
    .then(response => {
      dispatch(deleteArticleSuccess(response));
      history.goBack();
      successToast('Article deleted successfully');
    })
    .catch(error => {
      dispatch(deleteArticleFailure(error));
    });
};

/*
 *Defines the deleteArticle actions and dispatches corresponding
 *action for either success
 *failure
 */
export const likeArticle = (slug, history) => async dispatch => {
  return axios
    .post(`${BASE_URL}/articles/${slug}/like/`, null, config)
    .then(response => {
      dispatch(likeArticleSuccess(response));
      successToast(response.data.message);
      dispatch(fetchOneArticle(slug, history));
    })
    .catch(error => {
      dispatch(likeArticleFailure(error));
    });
};

/*
 *Defines the dislikeArticle actions and dispatches corresponding
 *action for either success
 *failure
 */
export const dislikeArticle = (slug, history) => async dispatch => {
  return axios
    .post(`${BASE_URL}/articles/${slug}/dislike/`, null, config)
    .then(response => {
      dispatch(dislikeArticleSuccess(response));
      successToast(response.data.message);
      dispatch(fetchOneArticle(slug, history));
    })
    .catch(error => {
      dispatch(dislikeArticleFailure(error));
    });
};
