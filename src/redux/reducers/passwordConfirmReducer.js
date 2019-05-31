import { PASSWORD_CONFIRM } from '../constants';

const initialState = {
  isLoading: false,
  message: '',
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PASSWORD_CONFIRM:
      return {
        ...state,
        isLoading: true,
      };
    case `${PASSWORD_CONFIRM}_SUCCESS`:
      return {
        ...state,
        message: action.response,
        isLoading: false,
      };
    case `${PASSWORD_CONFIRM}_FAILURE`:
      return {
        ...state,
        message: action.error,
        isLoading: false,
        isError: action.isError,
      };
    default:
      return {
        ...state,
      };
  }
};
