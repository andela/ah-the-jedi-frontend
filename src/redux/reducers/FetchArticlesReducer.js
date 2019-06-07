import { FETCH_ARTICLES, DELETE_ARTICLE } from '../constants';

const initialState = {
  isLoading: false,
  articles: {},
  error: {},
  article: {},
};

const FetchArticlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_ARTICLES}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${FETCH_ARTICLES}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        articles: action.response,
      };
    case `${FETCH_ARTICLES}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        articles: action.error,
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
    case `${FETCH_ARTICLES}_SUCCESS_FOR_AUTHOR`:
      return {
        ...state,
        isLoading: false,
        authorArticles: action.response,
      };
    case `${FETCH_ARTICLES}_FAILURE_FOR_AUTHOR`:
      return {
        ...state,
        isLoading: false,
        authorArticles: action.error,
      };

    case `${DELETE_ARTICLE}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${DELETE_ARTICLE}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        authorArticleDelete: action.response,
      };
    case `${DELETE_ARTICLE}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        authorArticleDelete: action.error,
      };

    default:
      return { ...state };
  }
};

export default FetchArticlesReducer;
