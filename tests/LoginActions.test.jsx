import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { CONSTANTS } from '../src/redux/constants';
import { loginUser, loginSuccess, loginFailure } from '../src/redux/actions/loginActions';

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
});
