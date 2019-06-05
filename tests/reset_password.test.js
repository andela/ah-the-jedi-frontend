import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import reducers from '../src/redux/reducers';
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

describe('reset password successful reducers', () => {
  it('tests for initial state', () => {
    const state = reducers(undefined, {});
    expect(state).toEqual({
      reset_password: { isLoading: false, message: '', error: '' },
      password_confirm: { isLoading: false, message: '', error: '' },
    });
  });

  it('should handle reset password post request start', () => {
    const startAction = {
      type: RESET_PASSWORD,
    };
    const state = reducers(undefined, startAction);
    // it's empty on purpose because it's just starting to fetch request
    expect(state).toEqual({
      reset_password: { isLoading: true, message: '', error: '' },
      password_confirm: { isLoading: false, message: '', error: '' },
    });
  });

  it('should handle reset password post request success', () => {
    const successAction = {
      type: `${RESET_PASSWORD}_SUCCESS`,
    };
    const state = reducers(undefined, successAction);
    expect(state).toEqual({
      reset_password: { isLoading: false, message: undefined, error: '' },
      password_confirm: { isLoading: false, message: '', error: '' },
    });
  });

  it('should handle reset password post request failure', () => {
    const failureAction = {
      type: `${RESET_PASSWORD}_FAILURE`,
    };
    const state = reducers(undefined, failureAction);
    expect(state).toEqual({
      reset_password: { isLoading: false, message: undefined, error: '' },
      password_confirm: { isLoading: false, message: '', error: '' },
    });
  });
});
