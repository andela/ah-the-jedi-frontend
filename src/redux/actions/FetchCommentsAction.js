import axios from 'axios';
import { BASE_URL, FETCH_COMMENT } from '../constants';

export const fetchCommentsAction = (slug, history) => dispatch => {
  dispatch({ type: FETCH_COMMENT });
  axios
    .get(`${BASE_URL}/articles/${slug}/comments/`)
    .then(response => {
      dispatch(fetchCommentsSuccess(response.data));
    })
    .catch(error => {
      dispatch(fetchCommentsFailure(error));
    });
};

export const fetchCommentsSuccess = response => ({
  type: `${FETCH_COMMENT}_SUCCESS`,
  response,
});

export const fetchCommentsFailure = error => ({
  type: `${FETCH_COMMENT}_FAILURE`,
  error,
});
