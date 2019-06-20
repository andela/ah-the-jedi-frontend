import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { userFollow, userUnFollow } from '../src/redux/actions/followAction';
import { FOLLOW_USER, UNFOLLOW_USER } from '../src/redux/constants';

/*
 * Defines tests for user follow and unfollow action:
 * Test for successful and unsuccessful dispatch of action
 */

const mockData = {
  followData: {
    username: 'jkamz',
    token: 'hsbhjbjhbjnkjnknlkml',
  },
  response: [{}],
  status: 200,
  error: {
    error: 'You already followed this user',
    status: 403,
  },
};

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const { response, followData, error } = mockData;

describe('test follow actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests for successful user follow action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [{ type: FOLLOW_USER }, { type: `${FOLLOW_USER}_SUCCESS`, response }];

    const store = mockStore({});
    const { data, token } = followData;

    return store
      .dispatch(userFollow(data, token))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful user follow', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: error.error,
      });
    });

    const expectedActions = { type: `${FOLLOW_USER}_FAILURE`, error: error.error };

    const store = mockStore({});

    return store.dispatch(userFollow()).catch(() => {
      expect(error.error).toEqual(expectedActions.type);
    });
  });
});

describe('test unfollow actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests for successful user unfollow action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [
      { type: UNFOLLOW_USER },
      { type: `${UNFOLLOW_USER}_SUCCESS`, response },
    ];

    const store = mockStore({});
    const { data, token } = followData;

    return store
      .dispatch(userUnFollow(data, token))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful user unfollow', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 403,
        response: error.error,
      });
    });

    const expectedActions = { type: `${UNFOLLOW_USER}_FAILURE`, error: error.error };

    const store = mockStore({});

    return store.dispatch(userUnFollow()).catch(() => {
      expect(error.error).toEqual(expectedActions.type);
    });
  });
});
