import expect from 'expect';
import followReducer from '../src/redux/reducers/followReducer';
import { FOLLOW_USER, UNFOLLOW_USER } from '../src/redux/constants';

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
      profile: {
        bio: 'I love small nice heads',
        created_at: '2019-05-16 11:51:58',
        email: 'kathiekim95@gmail.com',
        first_name: 'Cate chep',
        following: 'True',
        image: 'https://res.cloudinary.com/do8v0ew77/image/upload/v1560337738/20190612110858.png',
        last_name: 'cate cate',
        updated_at: '2019-06-12 11:09:01',
        username: 'kathiekim',
      },
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

describe('test follow and unfollow user reducer', () => {
  it('should handle follower user request start', () => {
    const startAction = {
      type: FOLLOW_USER,
    };
    const state = followReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle unfollower user request start', () => {
    const startAction = {
      type: UNFOLLOW_USER,
    };
    const state = followReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle follow user request success', () => {
    const successAction = {
      type: `${FOLLOW_USER}_SUCCESS`,
      response: mockData.response,
    };
    const state = followReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle unfollow user request success', () => {
    const successAction = {
      type: `${UNFOLLOW_USER}_SUCCESS`,
      response: mockData.response,
    };
    const state = followReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle follow user request failure', () => {
    const failureAction = {
      type: `${FOLLOW_USER}_FAILURE`,
      error: mockData.error,
    };
    const state = followReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle unfollow user request failure', () => {
    const failureAction = {
      type: `${UNFOLLOW_USER}_FAILURE`,
      error: mockData.error,
    };
    const state = followReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});
