import { FETCH_PROFILE } from '../constants';

const initialState = {
  isLoading: false,
  profile: {},
  error: {},
};

/*
 *Defines reducer for profile component and returns the
 *state based on the action types
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE:
      return { ...state, isLoading: true };
    case `${FETCH_PROFILE}_SUCCESS`:
      return { ...state, isLoading: false, profile: action.response };
    case `${FETCH_PROFILE}_FAILURE`:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};
