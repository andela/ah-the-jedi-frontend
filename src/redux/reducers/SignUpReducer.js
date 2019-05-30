import { SIGNUP_USER } from '../constants';

const initialState = {
  isLoading: false,
  message: {},
  error: {},
};

// reducers receive two parameters
export default (state = initialState, action) => {
  switch (action.type) {
    case `${SIGNUP_USER}_SEND_VERIFICATION_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        message: action.response,
        error: {},
      };
    case `${SIGNUP_USER}_SEND_VERIFICATION_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error.response.data,
      };
    default:
      return { ...state };
  }
};
