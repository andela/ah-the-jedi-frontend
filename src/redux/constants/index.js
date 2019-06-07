export const BASE_URL = 'https://ah-the-jedi-backend-staging.herokuapp.com/api';
export const SIGNUP_USER = 'SIGNUP_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const PASSWORD_CONFIRM = 'PASSWORD_CONFIRM';
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
