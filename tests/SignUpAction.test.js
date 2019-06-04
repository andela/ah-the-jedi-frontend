import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import instance from '../axiosconfig';
import { SIGNUP_USER, BASE_URL } from '../src/redux/constants';
import {
  verificationSent,
  verificationFailure,
  signUpUser,
  socialAction,
} from '../src/redux/actions/SignUpAction';

describe('unit tests for signup actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  beforeEach(() => {
    moxios.install(instance);
  });
  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('it dispatches SIGNUP_USER on user signup', async done => {
    const data = {
      user: {
        data: {
          id: 1,
          email: 'test@email.com',
          username: 'testUser',
          token: '56v-a2f267ccf5139da3a9e4',
        },
        message: 'Account succesfully registered. Check your mail inbox to activate your account.',
      },
    };
    const expectedAction = verificationSent(data);
    moxios.stubRequest(`${BASE_URL}/users/`, { status: 201, response: data });
    await store.dispatch(signUpUser());
    expect(store.getActions()[0].type).toEqual('SIGNUP_USER');
    done();
  });

  it('it dispatches SIGNUP_USER_ACTIVATION_SUCCESS on account activation', async done => {
    const data = {
      user: {
        data: {
          id: 1,
          email: 'test@email.com',
          username: 'testUser',
          token: '56v-a2f267ccf5139da3a9e4',
        },
        message: 'Account succesfully registered. Check your mail inbox to activate your account.',
      },
    };
    const expectedAction = verificationSent(data);
    moxios.stubRequest(`${BASE_URL}/users/`, { status: 201, response: data });
    await store.dispatch(verificationSent(data));
    expect(store.getActions()).toContainEqual(expectedAction);
    done();
  });

  it('it dispatches SIGNUP_USER_ACTIVATION_SUCCESS on account activation', async done => {
    const data = {
      user: {
        data: {
          id: 1,
          email: 'test@email.com',
          username: 'testUser',
          token: '56v-a2f267ccf5139da3a9e4',
        },
        message: 'Account succesfully registered. Check your mail inbox to activate your account.',
      },
    };
    const expectedAction = verificationSent(data);
    moxios.stubRequest(`${BASE_URL}/users/`, { status: 201, response: data });
    await store.dispatch(signUpUser(data));
    expect(store.getActions()).toContainEqual(expectedAction);
    done();
  });

  it('dispatches SIGNUP_USER_SOCIAL on social login/signup', async done => {
    const res = {
      email: 'kathiekim95@gmail.com',
      username: 'kathiekim',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6ImthdGhpZWtpbTk1QGdtYWlsLmNvbSIsImV4cCI6MTU1OTg2MDM1NywiZW1haWwiOiJrYXRoaWVraW05NUBnbWFpbC5jb20ifQ.taJlapQocvE86WnZNyJhTKwgkzN_ldl4dgM05MWPkkw',
    };

    const expectedAction = socialAction(res);
    moxios.stubRequest(`${BASE_URL}/users/social/login`, { status: 200, response: res });
    await store.dispatch(socialAction(res));
    expect(store.getActions()).toContainEqual(expectedAction);
    done();
  });

  it('returns signup verificationSent response', () => {
    const newAction = verificationSent('success');
    const expectedAction = {
      type: `${SIGNUP_USER}_SEND_VERIFICATION_SUCCESS`,
      response: 'success',
    };
    expect(newAction).toEqual(expectedAction);
  });

  it('returns signup verificationFailure response', () => {
    const newAction = verificationFailure('failure');
    const expectedAction = {
      type: `${SIGNUP_USER}_SEND_VERIFICATION_FAILURE`,
      error: 'failure',
    };
    expect(newAction).toEqual(expectedAction);
  });
});
