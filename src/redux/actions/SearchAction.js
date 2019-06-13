import axios from 'axios';
import { SEARCH, BASE_URL } from '../constants';

/*
 * dispatches the action type SEARCH_SUCCESS type on success
 */
export const searchSuccess = response => ({
  type: `${SEARCH}_SUCCESS`,
  response,
});

/*
 * dispatches the action type SEARCH_FAILURE type on failure
 */
export const searchFailure = error => ({
  type: `${SEARCH}_FAILURE`,
  error,
});

/*
 * Defines the SEARCH actions:
 * dispatches search data found on success
 * dispatches search data not found on failure
 */
export const search = (query, data) => dispatch => {
  dispatch({ type: SEARCH });
  return axios
    .get(`${BASE_URL}/article/search/?${query}=${data}`)
    .then(response => {
      dispatch(searchSuccess(response));
    })
    .catch(error => {
      dispatch(searchFailure(error));
    });
};
