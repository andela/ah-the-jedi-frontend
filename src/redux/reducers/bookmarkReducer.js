import { BOOKMARK } from '../constants';

const initialState = {
  isLoading: false,
  bookmarked: false,
  articles: {},
  error: {},
};

/*
 *Defines reducer for Article bookmark component and returns the
 *state based on the action types
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKMARK:
      return { ...state, isLoading: true };
    case `${BOOKMARK}_SUCCESS`:
      return { ...state, isLoading: false, bookmarked: true };
    case `${BOOKMARK}_FAILURE`:
      return { ...state, isLoading: false, error: action.error };
    case `UN${BOOKMARK}_SUCCESS`:
      return { ...state, isLoading: false, bookmarked: false };
    case `FETCH_${BOOKMARK}_SUCCESS`:
      return { ...state, isLoading: false, articles: action.response };
    case `MARK_${BOOKMARK}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        bookmarked: true,
        articles: [{}],
      };
    default:
      return state;
  }
};
