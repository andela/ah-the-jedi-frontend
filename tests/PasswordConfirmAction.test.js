import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { PASSWORD_CONFIRM } from '../src/redux/constants';
import { passwordConfirm } from '../src/redux/actions/passwordConfirmAction';

const mockData = {
  passwordConfirmData: {
    password: '12345678',
  },
  response: {
    data: {
      user: {
        message: 'Your account password has been changed successfully.',
      },
    },
    status: 200,
  },
  error: {
    message: 'Password must be alphanumeric with a minimum of 8 characters.',
  },
};

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('test for password confirm action', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests for successful confirm password reset action', () => {
    const { response } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: response.data,
      });
    });

    const expectedActions = [
      { type: PASSWORD_CONFIRM },
      { type: `${PASSWORD_CONFIRM}_SUCCESS`, response: response.data },
    ];

    const store = mockStore({});

    return store
      .dispatch(passwordConfirm())
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
      })
      .catch(() => {});
  });

  it('tests for unsuccessful confirm password reset action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.message,
      });
    });

    const expectedActions = { type: `${PASSWORD_CONFIRM}_FAILURE`, error: error.message };

    const store = mockStore({});

    return store.dispatch(passwordConfirm()).catch(() => {
      expect(error.message).toEqual(expectedActions.error);
    });
  });
});
