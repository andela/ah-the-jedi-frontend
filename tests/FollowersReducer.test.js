import expect from 'expect';
import followersReducer from '../src/redux/reducers/followersReducer';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../src/redux/constants';

/*
 * Defines the followers reducer tests:
 * Tests for successful change of state
 */

const mockData = {
  followerData: {
    username: 'jkamz',
  },
  response: {
    data: {
      data: { followers: 5, users: [] },
    },
    error: {
      response: {
        data: {
          message: 'Authentication details were not provided',
        },
      },
      status: 400,
    },
  },
};

describe('test follower reducer', () => {
  it('should handle follower get request start', () => {
    const startAction = {
      type: GET_FOLLOWERS,
    };
    const state = followersReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle follower get request success', () => {
    const successAction = {
      type: `${GET_FOLLOWERS}_SUCCESS`,
      response: mockData.response,
    };
    const state = followersReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle following get request success', () => {
    const successAction = {
      type: `${GET_FOLLOWING}_SUCCESS`,
      response: mockData.response,
    };
    const state = followersReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle follower get request failure', () => {
    const failureAction = {
      type: `${GET_FOLLOWERS}_FAILURE`,
      error: mockData.error,
    };
    const state = followersReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle following get request failure', () => {
    const failureAction = {
      type: `${GET_FOLLOWING}_FAILURE`,
      error: mockData.error,
    };
    const state = followersReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});
