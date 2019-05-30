import { LOGIN_USER } from '../constants';

const initialState = {
  isLoading: false,
  data: {},
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${LOGIN_USER}_SUCCESS`:
      //   console.log('this is an action' + action.response.user.token);
      const token = action.response.user.token;
      localStorage.setItem('token', `Bearer ${token}`);

      return { ...state, isLoading: false, data: action.response };

    case `${LOGIN_USER}_FAILURE`:
      console.log('the error' + action.error.response);
      return {
        ...state,
        isLoading: false,
        error: action.error.response.data,
        isError: true
      };

    default:
      return { ...state };
  }
};
