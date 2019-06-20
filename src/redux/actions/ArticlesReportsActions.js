import axios from 'axios';
import {
  CREATE_REPORT, BASE_URL, FETCH_REPORT, DELETE_REPORT, UPDATE_REPORT,
} from '../constants';
import { successToast, errorToast } from '../../helpers';

/*
 * dispatches the action type CREATE_REPORT_SUCCESS type on success
 */
export const createReportSuccess = response => ({
  type: `${CREATE_REPORT}_SUCCESS`,
  response,
});

/*
 * dispatches the action type CREATE_REPORT_FAILURE type on failure
 */
export const createReportFailure = error => ({
  type: `${CREATE_REPORT}_FAILURE`,
  error,
});

/*
 * dispatches the action type FETCH_REPORT_REPORT_SUCCESS type on success
 */
export const fetchReportSuccess = response => ({
  type: `${FETCH_REPORT}_SUCCESS`,
  response,
});

/*
 * dispatches the action type FETCH_REPORT_REPORT_FAILURE type on failure
 */
export const fetchReportFailure = error => ({
  type: `${FETCH_REPORT}_FAILURE`,
  error,
});

/*
 * dispatches the action type DELETE_REPORT_SUCCESS type on success
 */
export const deleteReportSuccess = response => ({
  type: `${DELETE_REPORT}_SUCCESS`,
  response,
});

/*
 * dispatches the action type DELETE_REPORT_FAILURE type on failure
 */
export const deleteReportFailure = error => ({
  type: `${DELETE_REPORT}_FAILURE`,
  error,
});

/*
 * dispatches the action type UPDATE_REPORT_SUCCESS type on success
 */
export const updateReportSuccess = response => ({
  type: `${UPDATE_REPORT}_SUCCESS`,
  response,
});

/*
 * dispatches the action type DELETE_REPORT_FAILURE type on failure
 */
export const updateReportReportFailure = error => ({
  type: `${UPDATE_REPORT}_FAILURE`,
  error,
});


/*
 * Defines the Create Report actions:
 * dispatches createReportSuccess on success
 * dispatches createReportFailure on failure
 */

const config = {
  headers: { Authorization: localStorage.getItem('token') },
};

export const createReport = data => async dispatch => {
  const url = `${BASE_URL}/reports/`;
  dispatch({ type: CREATE_REPORT });
  return axios
    .post(url, data, config)
    .then(response => {
      dispatch(createReportSuccess(response));
      successToast('Your report has been submitted');
      setTimeout(() => {
        // istanbul ignore next
        window.location.reload();
      }, 2000);
    })
    .catch(error => {
      dispatch(createReportFailure(error));
      errorToast(error.response.data.error);
    });
};

export const fetchReport = () => async dispatch => {
  const url = `${BASE_URL}/reports/`;
  dispatch({ type: FETCH_REPORT });
  return axios
    .get(url, config)
    .then(response => {
      dispatch(fetchReportSuccess(response));
    })
    .catch(error => {
      dispatch(fetchReportFailure(error));
    });
};

/*
 *Defines the deleteReport actions and dispatches the right
 *action for either success
 *failure
 */
export const deleteReport = id => dispatch => {
  dispatch({ type: DELETE_REPORT });
  return axios
    .delete(`${BASE_URL}/reports/${id}/`, config)
    .then(response => {
      dispatch(deleteReportSuccess(response));
      successToast('Article report deleted successfully');
      // istanbul ignore next
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch(error => {
      dispatch(deleteReportFailure(error));
    });
};

/*
 *Defines the updateReport actions and dispatches the right
 *action for either success
 *failure
 */

export const updateReport = (id, data) => dispatch => {
  dispatch({ type: UPDATE_REPORT });
  return axios
    .patch(`${BASE_URL}/reports/${id}/`, data, config)
    .then(response => {
      dispatch(updateReportSuccess(response));
      successToast('Report successfully updated');
      setTimeout(() => {
        // istanbul ignore next
        window.location.reload();
      }, 1000);
    })
    .catch(error => {
      dispatch(updateReportReportFailure(error.response));
      errorToast(error.response.data.error);
      // istanbul ignore next
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
};
