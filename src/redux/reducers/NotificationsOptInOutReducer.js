import { OPTINOUT } from '../constants';

const initialState = {
  isLoading: false,
  data: {},
  error: {},
};

export const OptInOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${OPTINOUT}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${OPTINOUT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case `${OPTINOUT}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};

export const NotifyStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${OPTINOUT}`:
      return {
        ...state,
        isLoading: true,
      };
    case `${OPTINOUT}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        data: action.response,
      };
    case `${OPTINOUT}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return { ...state };
  }
};
