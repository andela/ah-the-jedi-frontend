import axios from 'axios';
/* istanbul ignore file */
import store from './src/redux/store';
/* istanbul ignore file */
import BASE_URL from './src/redux/constants';
/* istanbul ignore file */
import 'babel-polyfill';
/* istanbul ignore file */

// configure base url
const instance = axios.create({
  baseURL: BASE_URL,
});

// intercept requests and add authorization token
instance.interceptors.request.use(config => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
