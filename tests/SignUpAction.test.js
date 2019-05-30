import thunk from 'redux-thunk';
import {
  verificationSent,
  verificationFailure,
  signUpUser,
} from '../src/redux/actions/SignUpAction';
import { SIGNUP_USER, BASE_URL } from '../src/redux/constants';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import instance from '../axiosconfig';

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
