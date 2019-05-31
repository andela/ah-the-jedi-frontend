import { LOGIN_USER } from '../constants';

const initialState = {
  isAuthentincated: false,
  data: {},
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN_USER}_SUCCESS`:
      const token = action.response.user.token;
      localStorage.setItem('token', `Bearer ${token}`);

      return { ...state, isAuthentincated: true, data: action.response };

    case `${LOGIN_USER}_FAILURE`:
      return {
        ...state,
        isAuthentincated: false,
        error: action.error.response.data,
        isError: true
      };
    case `${LOGIN_USER}_LOGOUT`:
      return {
        ...state,
        isAuthentincated: false
      };

    default:
      return { ...state };
  }
};
