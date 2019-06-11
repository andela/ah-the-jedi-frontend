import { FETCH_COMMENT } from '../constants';

const initialState = {
  isAuthenticated: false,
  data: {},
  error: {},
  isLoading: true,
};

/*
 *Defines login reducer and returns the
 *state based on the action types
 */
const FetchCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_COMMENT}`:
      return {
        ...state,
        isLoading: true,
      };

    case `${FETCH_COMMENT}_SUCCESS`:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        data: action.response,
      };

    case `${FETCH_COMMENT}_FAILURE`:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.error.response,
        isError: true,
      };

    default:
      return { ...state };
  }
};

export default FetchCommentsReducer;
