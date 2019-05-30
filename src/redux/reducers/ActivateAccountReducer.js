import { SIGNUP_USER } from '../constants';

const initialState = {
  isLoading: false,
  message: {},
  error: {},
};

/*
 * Defines the Account activation reducers:
 * On account verified: SIGNUP_USER_ACTIVATION_SUCCESS
 * On account verification failure: SIGNUP_USER_ACTIVATION_FAILURE
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case `${SIGNUP_USER}_ACTIVATION_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        message: action.response,
        error: {},
      };
    case `${SIGNUP_USER}_ACTIVATION_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error.response.data,
      };
    default:
      return { ...state };
  }
};
