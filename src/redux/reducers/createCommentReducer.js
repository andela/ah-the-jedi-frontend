import { CREATE_COMMENT } from '../constants';

export const initialState = {
  isAuthenticated: false,
  data: {},
  error: {},
  isLoading: false,
};

/*
 *Defines create comment reducer and returns the
 *state based on the action types
 */
const CreateCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${CREATE_COMMENT}`:
      return {
        ...state,
        isLoading: true,
      };

    case `${CREATE_COMMENT}_SUCCESS`:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        data: action.response,
      };

    case `${CREATE_COMMENT}_FAILURE`:
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        error: action.error.response,
        isError: true,
      };

    default:
      return { ...state };
  }
};

export default CreateCommentReducer;
