import { GET_FOLLOWERS, GET_FOLLOWING } from '../constants';

const initialState = {
  isLoading: false,
  followers: '',
  error: {},
  following: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS:
      return { ...state, isLoading: true };

    case `${GET_FOLLOWERS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        followers: action.response.data.data,
        success: true,
      };

    case `${GET_FOLLOWING}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        following: action.response.data.data,
        success: true,
      };

    case `${GET_FOLLOWERS}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        success: true,
      };

    case `${GET_FOLLOWING}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        success: true,
      };

    default:
      return state;
  }
};
