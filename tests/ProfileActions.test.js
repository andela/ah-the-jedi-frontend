import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { FETCH_PROFILE } from '../src/redux/constants';
import { updateProfile, fetchProfile } from '../src/redux/actions/profileActions';

describe('Test profile actions', () => {
  const testStore = configureMockStore([thunk]);
  const store = testStore({});

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const profile = {
    first_name: 'Lee',
    last_name: 'Mwangi',
    username: 'Leewel',
    email: 'thismyr2@gmail.com',
    bio: 'I love silver opera',
    image: 'https://res.cloudinary.com/do8v0ew77/image/upload/v1559832986/20190606145625.png',
    created_at: '2019-05-16 11:51:11',
    updated_at: '2019-06-06 15:21:33',
    following: 'True',
  };

  const error = {
    status: 404,
    message: 'Request failed with status code 404',
  };

  it('test successful fetch profile actions', () => {
    const { username } = profile;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          profile,
        },
      });
    });

    const expectedActions = [
      { type: FETCH_PROFILE },
      { type: `${FETCH_PROFILE}_SUCCESS`, profile },
    ];

    return store
      .dispatch(fetchProfile(username))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('test fetch profile actions with errors', () => {
    const { username } = profile;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          errors: 'profile with this username does not exist',
          status: '404',
        },
      });
    });

    const expectedActions = [{ type: FETCH_PROFILE }, { type: `${FETCH_PROFILE}_FAILURE`, error }];

    return store.dispatch(fetchProfile(username)).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('test successful edit profile actions', () => {
    const { username } = profile;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          profile,
        },
      });
    });

    const expectedActions = [
      { type: FETCH_PROFILE },
      { type: `${FETCH_PROFILE}_SUCCESS`, profile },
    ];

    return store
      .dispatch(updateProfile(username))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('test edit profile actions with errors', () => {
    const { username } = profile;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          errors: 'profile with this username does not exist',
          status: '404',
        },
      });
    });

    const expectedActions = [{ type: FETCH_PROFILE }, { type: `${FETCH_PROFILE}_FAILURE`, error }];

    return store.dispatch(updateProfile(username)).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });
});
