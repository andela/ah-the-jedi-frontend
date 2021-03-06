import { LOGIN_USER } from '../constants';

const initialState = {
  isAuthenticated: false,
  data: {},
  error: {},
  isLoading: false,
  
};

/*
 *Defines login reducer and returns the
 *state based on the action types
 */
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN_USER}`:
      return {
        ...state,
        isLoading: true,
      };

    case `${LOGIN_USER}_SUCCESS`: {
      const { token } = action.response.user;
      const { user } = action.response;
      localStorage.setItem('token', `Bearer ${token}`);
      localStorage.setItem('user', JSON.stringify(user));

      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        data: action.response,
      };
    }

    case `${LOGIN_USER}_SUCCESS_SOCIAL`: {
      const { token } = action.response;
      const userObj = action.response;
      const user = JSON.stringify(userObj);
      localStorage.setItem('token', `Bearer ${token}`);
      localStorage.setItem('user', user);

      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        data: action.response,
      };
    }

    case `${LOGIN_USER}_FAILURE`:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.error.response,
        isError: true,
      };
    case `${LOGIN_USER}_LOGOUT`:
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return { ...state };
  }
};

export default LoginReducer;
