import profileReducer from '../src/redux/reducers/profileReducer';
import { FETCH_PROFILE } from '../src/redux/constants';

describe('Unit Test for Profile reducer', () => {
  it('actions types and payload are dispatched successfully', () => {
    const action = {
      type: `${FETCH_PROFILE}_SUCCESS`,
      response: {
        data: {
          profile: {
            first_name: 'testuser',
          },
        },
      },
    };
    expect(profileReducer({}, action)).toEqual({
      isLoading: false,
      profile: { data: { profile: { first_name: 'testuser' } } },
    });
  });

  it('test successful fetch of profile', () => {
    const payload = {
      profile: {
        username: 'eric',
        first_name: 'Abraham',
        last_name: 'Kamau',
        bio: 'this is a test for fetch',
        following: false,
      },
    };
    expect(profileReducer({}, { type: `${FETCH_PROFILE}_SUCCESS` }).payload).toEqual();
  });

  it('test edit profile with errors', () => {
    const action = {
      type: `${FETCH_PROFILE}_FAILURE`,
      error: {
        errors: 'profile with this username does not exist',
        status: '404',
      },
    };
    expect(profileReducer({}, action)).toEqual({
      error: action.error,
      isLoading: false,
    });
  });

  it('test fetch profile with errors', () => {
    const action = {
      type: `${FETCH_PROFILE}_FAILURE`,
      error: {
        errors: 'profile with this username does not exist',
        status: '404',
      },
    };
    expect(profileReducer({}, action)).toEqual({
      error: action.error,
      isLoading: false,
    });
  });
});
