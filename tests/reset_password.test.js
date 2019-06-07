import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { resetPassword } from '../src/redux/actions/resetPasswordAction';
import { RESET_PASSWORD } from '../src/redux/constants';

const mockData = {
  resetPasswordData: {
    email: 'catherinechepkurui95@gmail.com',
  },
  response: {
    data: {
      message:
        'Password reset link has been sent to your email, check your email for instructions on how to change password',
      uid: 9,
      token: '56v-1dfedbe5e7b11ecc2c47',
    },
    status: 200,
  },
  error: {
    response: {
      data: {
        message: 'Account with this email not found.',
      },
    },
    status: 404,
  },
};

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('reset password actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests for successful password reset action', () => {
    const { response } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response.data,
      });
    });

    const expectedActions = [
      { type: RESET_PASSWORD },
      { type: `${RESET_PASSWORD}_SUCCESS`, response: response.data },
    ];

    const store = mockStore({});

    return store
      .dispatch(resetPassword())
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful password reset action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.response.data,
      });
    });

    const expectedActions = { type: `${RESET_PASSWORD}_FAILURE`, error: error.response.data };

    const store = mockStore({});

    return store.dispatch(resetPassword()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });
});
