import { RESET_PASSWORD } from '../constants';

const initialState = {
  isLoading: false,
  message: '',
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        isLoading: true,
      };
    case `${RESET_PASSWORD}_SUCCESS`:
      return {
        ...state,
        message: action.response,
        isLoading: false,
      };
    case `${RESET_PASSWORD}_FAILURE`:
      return {
        ...state,
        error: action.error.response,
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
