import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import { SIGNUP_USER, BASE_URL } from '../src/redux/constants';
import {
  signUpUser,
} from '../src/redux/actions/SignUpAction';

describe('unit tests for signup actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const user_data = {
    user: {
      email: 'test@email.com',
      username: 'testUser',
      bio: 'I work at Authors Haven',
      password: 'admin1211',
    },
  };

  it('returns SIGNUP_USER_SEND_VERIFICATION_SUCCESS on successful user registration', async (done) => {
    moxios.stubRequest(`${BASE_URL}/users/`, {
      user: {
        data: {
          id: 1,
          email: 'test@email.com',
          username: 'testUser',
          token: '56v-a2f267ccf5139da3a9e4',
        },
        message: 'Account succesfully registered. Check your mail inbox to activate your account.',
      },
    });

    await store.dispatch(signUpUser(user_data));
    expect(store.getActions()[1].type).toEqual(`${SIGNUP_USER}_SEND_VERIFICATION_SUCCESS`);
    done();
  });

  it('returns SIGNUP_USER_SEND_VERIFICATION_SUCCESS on successful user registration', async (done) => {
    moxios.stubRequest(`${BASE_URL}/users/`, {
      user: {
        data: {
          id: 1,
          email: 'test@email.com',
          username: 'testUser',
          token: '56v-a2f267ccf5139da3a9e4',
        },
        message: 'Account succesfully registered. Check your mail inbox to activate your account.',
      },
    });

    await store.dispatch(signUpUser(user_data));
    expect(store.getActions()[1].type).toEqual(`${SIGNUP_USER}_SEND_VERIFICATION_SUCCESS`);
    done();
  });

  it('returns SIGNUP_USER_SEND_VERIFICATION_FAILURE on failure user registration', async (done) => {
    moxios.stubRequest(`${BASE_URL}/users/`, {
      status: 409,
      errors: {},
    });

    await store.dispatch(signUpUser(user_data));
    expect(store.getActions()[1].type).toEqual(`${SIGNUP_USER}_SEND_VERIFICATION_FAILURE`);
    done();
  });
});
