import { CREATE_REPORT, FETCH_REPORT, DELETE_REPORT, UPDATE_REPORT } from '../constants';

const initialState = {
  isLoading: false,
  message: {},
  error: {},
  deleteReport: {},
};

/*
 * Defines the Create reports reducers:
 */
const ReportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_REPORT}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${CREATE_REPORT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        message: action.response,
        error: {},
      };
    case `${CREATE_REPORT}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error.response,
      };
    case `${FETCH_REPORT}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${FETCH_REPORT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        message: action.response,
        error: {},
      };
    case `${FETCH_REPORT}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error.response,
      };
    case `${DELETE_REPORT}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${DELETE_REPORT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        deleteReport: action.response,
        error: {},
      };
    case `${DELETE_REPORT}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case `${UPDATE_REPORT}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${UPDATE_REPORT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        updateReport: action.response,
        error: {},
      };
    case `${UPDATE_REPORT}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export default ReportsReducer;
