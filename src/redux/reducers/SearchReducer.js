import { SEARCH } from '../constants';

const initialState = {
  isLoading: false,
  message: {},
  error: {},
};

/*
 * Defines the search reducer:
 * On search data successfully found and retrieved: SEARCH_SUCCESS
 * On search data not found: SEARCH_FAILURE
 */
const SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SEARCH}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${SEARCH}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        message: action.response.data.results,
        error: {},
      };
    case `${SEARCH}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error.response.data.message,
      };
    default:
      return { ...state };
  }
};
export default SearchReducer;
