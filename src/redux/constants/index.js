export const BASE_URL = 'https://ah-the-jedi-backend-staging.herokuapp.com/api';
export const APP_URL = 'https://ah-the-jedi-frontend-staging.herokuapp.com/';
export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const PASSWORD_CONFIRM = 'PASSWORD_CONFIRM';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const BOOKMARK = 'BOOKMARK';

export const headers = (token = '') => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
};
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const SEARCH = 'SEARCH';
export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const GET_ONE_ARTICLE = 'GET_ONE_ARTICLE';
export const ARTICLES_URL = `${BASE_URL}/articles/`;
