import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { LOGIN_USER, SIGNUP_USER } from '../src/redux/constants';
import { loginUser, UserSocialLogin, logoutUser } from '../src/redux/actions/loginActions';

describe('Tests login actions', () => {
  const testStore = configureMockStore([thunk]);
  const store = testStore({});

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const user = {
    user: {
      email: 'test@gmail.com',
      username: 'benkim',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImJlbmtpbWVyaWNAZ21haWwuY29tIiwiZXhwIjoxNTU5NjU5NzE0LCJlbWFpbCI6ImJlbmtpbWVyaWNAZ21haWwuY29tIn0.DTW4GmstTCuKMZ7Umock-NARvF346-iQL0uGSgje9UQ',
    },
  };

  const error = {
    status: 400,
    message: 'Request failed with status code 400',
  };

  it('dispatches a success action', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          user,
        },
      });
    });

    const expectedActions = [{ type: LOGIN_USER }, { type: `${LOGIN_USER}_SUCCESS`, user }];

    return store
      .dispatch(loginUser(user))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('dispatches a successful social login action', () => {
    const res = {
      email: 'kathiekim95@gmail.com',
      username: 'kathiekim',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImthdGhpZWtpbTk1QGdtYWlsLmNvbSIsImV4cCI6MTU1OTg2MDM1NywiZW1haWwiOiJrYXRoaWVraW05NUBnbWFpbC5jb20ifQ.taJlapQocvE86WnZNyJhTKwgkzN_ldl4dgM05MWPkkw',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          res,
        },
      });
    });

    const expectedActions = [
      { type: LOGIN_USER },
      { type: SIGNUP_USER },
      { type: `${LOGIN_USER}_SUCCESS_SOCIAL`, res },
    ];

    return store
      .dispatch(UserSocialLogin(user))
      .then(() => {
        expect(store.getActions()[2].type).toEqual(expectedActions[2].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('returns login failure response', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          errors: {
            error: ['A user with this email and password was not found.'],
          },
        },
      });
    });

    const expectedActions = [{ type: LOGIN_USER }, { type: `${LOGIN_USER}_FAILURE`, error }];

    return store.dispatch(loginUser(user)).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('returns logout user response', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          errors: {
            error: ['A user with this email and password was not found.'],
          },
        },
      });
    });

    const expectedActions = [{ type: `${LOGIN_USER}_LOGOUT` }];

    store.dispatch(logoutUser());
    expect(store.getActions()[0].type).toEqual(expectedActions[0].type);

    expect(store.getActions()).toEqual(expectedActions);
  });
});
