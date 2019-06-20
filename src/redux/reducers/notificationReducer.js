import { NOTIFICATIONS } from '../constants';

const initialState = {
  isLoading: false,
  read: false,
  notifications: {},
  unread: [],
  error: {},
};

/*
 *Defines reducer for Notifications component and returns the
 *state based on the action types

 */
export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS:
      return { ...state, isLoading: true };
    case `${NOTIFICATIONS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        notifications: action.response,
      };
    case `${NOTIFICATIONS}_FAILURE`:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        read: false,
      };
    case `UNREAD_${NOTIFICATIONS}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        unread: action.response,
      };
    case `READ_${NOTIFICATIONS}_SUCCESS`:
      return { ...state, isLoading: false, read: true };
    default:
      return state;
  }
};
