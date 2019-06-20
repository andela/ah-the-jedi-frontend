import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { getFollowers, getFollowing } from '../src/redux/actions/followersAction';
import { GET_FOLLOWERS, GET_FOLLOWING } from '../src/redux/constants';

/*
 * Defines tests for user follow and unfollow action:
 * Test for successful and unsuccessful dispatch of action
 */

const mockData = {
  followerData: {
    username: 'jkamz',
    token: 'hsbhjbjhbjnkjnknlkml',
  },
  response: [{}],
  status: 200,
  error: {
    error: 'error',
    status: 404,
  },
};

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const { response, followerData, error } = mockData;
const { username, token } = followerData;

describe('test follower actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests for successful get follower action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [
      { type: GET_FOLLOWERS },
      { type: `${GET_FOLLOWERS}_SUCCESS`, response },
    ];

    const store = mockStore({});

    return store
      .dispatch(getFollowers(token))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful get followers', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: error.error,
      });
    });

    const expectedActions = { type: `${GET_FOLLOWERS}_FAILURE`, error: error.error };

    const store = mockStore({});

    return store.dispatch(getFollowers()).catch(() => {
      expect(error.error).toEqual(expectedActions.type);
    });
  });
});

describe('test following actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests for successful get following action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [
      { type: GET_FOLLOWING },
      { type: `${GET_FOLLOWING}_SUCCESS`, response },
    ];

    const store = mockStore({});

    return store
      .dispatch(getFollowing(token))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful get following', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: error.error,
      });
    });

    const expectedActions = { type: `${GET_FOLLOWING}_FAILURE`, error: error.error };

    const store = mockStore({});

    return store.dispatch(getFollowing()).catch(() => {
      expect(error.error).toEqual(expectedActions.type);
    });
  });
});
