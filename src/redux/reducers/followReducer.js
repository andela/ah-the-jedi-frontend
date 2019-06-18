import { FOLLOW_USER, UNFOLLOW_USER } from '../constants';

const initialState = {
  isLoading: false,
  profile: '',
  error: {},
  success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW_USER:
      return { ...state, isLoading: true };

    case UNFOLLOW_USER:
      return { ...state, isLoading: true };

    case `${FOLLOW_USER}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        isFollowing: 'Following',
        success: true,
      };

    case `${FOLLOW_USER}_FAILURE`:
      return { ...state, isLoading: false, following: false, success: true };

    case `${UNFOLLOW_USER}_SUCCESS`:
      return {
        ...state,
        isLoading: false,
        success: true,
        isFollowing: 'Follow',
      };

    case `${UNFOLLOW_USER}_FAILURE`:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
