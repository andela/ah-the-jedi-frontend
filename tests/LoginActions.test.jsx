import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { LOGIN_USER, BASE_URL } from '../src/redux/constants';
import {
  loginUser,
  loginSuccess,
  loginFailure,
  loginSuccessSocial,
  UserSocialLogin,
} from '../src/redux/actions/loginActions';
import { socialAction } from '../src/redux/actions/SignUpAction';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Tests login actions', () => {
  const initialState = {};
  const store = mockStore(initialState);
  const ROOT_URL = '/';

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('dispatches a success action', async done => {
    const user = {
      user: {
        email: 'test@gmail.com',
        username: 'benkim',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImJlbmtpbWVyaWNAZ21haWwuY29tIiwiZXhwIjoxNTU5NjU5NzE0LCJlbWFpbCI6ImJlbmtpbWVyaWNAZ21haWwuY29tIn0.DTW4GmstTCuKMZ7Umock-NARvF346-iQL0uGSgje9UQ',
      },
    };
    moxios.stubRequest('/users/login', {
      status: 200,
      response: {
        user,
      },
    });
    await store.dispatch(loginSuccess({}));
    expect(store.getActions()[0].type).toEqual('LOGIN_USER_SUCCESS');
    done();
  });

  it('dispatches a successful social login action', async done => {
    const res = {
      email: 'kathiekim95@gmail.com',
      username: 'kathiekim',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImthdGhpZWtpbTk1QGdtYWlsLmNvbSIsImV4cCI6MTU1OTg2MDM1NywiZW1haWwiOiJrYXRoaWVraW05NUBnbWFpbC5jb20ifQ.taJlapQocvE86WnZNyJhTKwgkzN_ldl4dgM05MWPkkw',
    };

    moxios.stubRequest('/users/social/login/', {
      status: 200,
      response: {
        res,
      },
    });
    await store.dispatch(loginSuccessSocial({}));
    const type = store.getActions()[0].type;
    expect(type).toEqual('LOGIN_USER_SUCCESS_SOCIAL');
    done();
  });

  it('dispatches LOGIN_USER_SOCIAL on social login', async done => {
    const res = {
      email: 'kathiekim95@gmail.com',
      username: 'kathiekim',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImthdGhpZWtpbTk1QGdtYWlsLmNvbSIsImV4cCI6MTU1OTg2MDM1NywiZW1haWwiOiJrYXRoaWVraW05NUBnbWFpbC5jb20ifQ.taJlapQocvE86WnZNyJhTKwgkzN_ldl4dgM05MWPkkw',
    };

    const expectedAction = loginSuccessSocial(res);
    moxios.stubRequest(`${BASE_URL}/users/social/login`, { status: 200, response: res });
    await store.dispatch(loginSuccessSocial(res));
    expect(store.getActions()).toContainEqual(expectedAction);
    done();
  });

  it('dispatches LOGIN_USER_SOCIAL on login', async done => {
    const res = {
      user: {
        email: 'test@gmail.com',
        username: 'benkim',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImJlbmtpbWVyaWNAZ21haWwuY29tIiwiZXhwIjoxNTU5NjU5NzE0LCJlbWFpbCI6ImJlbmtpbWVyaWNAZ21haWwuY29tIn0.DTW4GmstTCuKMZ7Umock-NARvF346-iQL0uGSgje9UQ',
      },
    };

    const expectedAction = loginSuccess(res);
    moxios.stubRequest(`${BASE_URL}/users/social/login`, { status: 200, response: res });
    await store.dispatch(loginSuccess(res));
    expect(store.getActions()).toContainEqual(expectedAction);
    done();
  });

  it('returns social login sucess response', () => {
    const newAction = loginSuccessSocial('success');
    const expectedAction = {
      type: `${LOGIN_USER}_SUCCESS_SOCIAL`,
      response: 'success',
    };
    expect(newAction).toEqual(expectedAction);
  });

  it('returns login sucess response', () => {
    const newAction = loginSuccess('success');
    const expectedAction = {
      type: `${LOGIN_USER}_SUCCESS`,
      response: 'success',
    };
    expect(newAction).toEqual(expectedAction);
  });

  it('returns login failure response', () => {
    const newAction = loginFailure('failure');
    const expectedAction = {
      type: `${LOGIN_USER}_FAILURE`,
      error: 'failure',
    };
    expect(newAction).toEqual(expectedAction);
  });
});
