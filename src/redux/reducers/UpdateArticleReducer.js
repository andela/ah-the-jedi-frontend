import { UPDATE_ARTICLE, GET_ONE_ARTICLE } from '../constants';

const initialState = {
  isLoading: false,
  message: {},
  error: {},
};

/*
 * Defines the Update Article reducers:
 * On getOne: GET_ONE_ARTICLE_SUCCESS
 * On getOne failure: GET_ONE_ARTICLE_FAILURE
 * On updated: UPDATE_ARTICLE_SUCCESS
 * On update failure: UPDATE_ARTICLE_FAILURE
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case `${UPDATE_ARTICLE}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${UPDATE_ARTICLE}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        message: action.response,
        error: {},
      };
    case `${UPDATE_ARTICLE}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error.response.data,
      };
    case `${GET_ONE_ARTICLE}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${GET_ONE_ARTICLE}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        message: action.response,
        error: {},
      };
    case `${GET_ONE_ARTICLE}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error.response.data,
      };
    default:
      return { ...state };
  }
};
