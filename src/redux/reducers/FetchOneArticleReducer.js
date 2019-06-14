import { FETCH_ARTICLES } from '../constants';

const initialState = {
  isLoading: false,
  article: {},
  error: {},
};

const FetchOneArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_ARTICLES}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${FETCH_ARTICLES}_SUCCESS_FOR_ONE`:
      return {
        ...state,
        isLoading: false,
        article: action.response,
      };
    case `${FETCH_ARTICLES}_FAILURE_FOR_ONE`:
      return {
        ...state,
        isLoading: false,
        article: action.error,
      };

    default:
      return { ...state };
  }
};

export default FetchOneArticlesReducer;
