import axios from 'axios';
import { GET_TAGS, BASE_URL } from '../constants';

/*
 * dispatches the action type SEARCH_SUCCESS type on success
 */
export const fetchTagsSuccess = response => ({
  type: `${GET_TAGS}_SUCCESS`,
  response,
});


/*
 * dispatches the action type SEARCH_FAILURE type on failure
 */
export const fetchTagsFailure = error => ({
  type: `${GET_TAGS}_FAILURE`,
  error,
});

/*
 * Defines the GET_TAGS actions
 */
export const fetchTags = () => dispatch => {
  dispatch({ type: GET_TAGS });
  return axios
    .get(`${BASE_URL}/tags`)
    .then(response => {
      dispatch(fetchTagsSuccess(response));
    }).catch(error => {
      dispatch(fetchTagsFailure(error));
    });
};
