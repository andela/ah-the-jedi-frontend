import { GET_TAGS } from '../constants';

const initialState = {
  isLoading: false,
  message: {},
  error: {},
};

/*
 * Defines the fetch tags reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_TAGS}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${GET_TAGS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        message: action.response,
      };
    case `${GET_TAGS}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.response,
      };
    default:
      return { ...state };
  }
};
