import { CREATE_ARTICLE } from '../constants';

const initialState = {
  isLoading: false,
  message: {},
  error: {},
};

/*
 * Defines the Create Article reducers:
 * On created: CREATE_ARTICLE_SUCCESS
 * On create failure: CREATE_ARTICLE_FAILURE
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_ARTICLE}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${CREATE_ARTICLE}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        message: action.response,
        error: {},
      };
    case `${CREATE_ARTICLE}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error.response.data,
      };
    default:
      return { ...state };
  }
};
