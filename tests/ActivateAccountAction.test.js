import thunk from 'redux-thunk';
import {
  activateUser,
} from '../src/redux/actions/ActivateAccountAction';
import { SIGNUP_USER, BASE_URL } from '../src/redux/constants';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

describe('unit tests for account activation actions', () => {
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

  it('returns SIGNUP_USER_ACTIVATION_SUCCESS on account activation', async (done) => {

    moxios.stubRequest(`${BASE_URL}/users/activate/?uid=1&token=56v-b4048f12ea77edab35d5`, {
      status: 201,
      response: {},
    });

    await store.dispatch(activateUser('1', '56v-b4048f12ea77edab35d5'));
    expect(store.getActions()[0].type).toEqual(`${SIGNUP_USER}_ACTIVATION_SUCCESS`);
    done();
  });

  it('returns SIGNUP_USER_ACTIVATION_FAILURE on account activation', async (done) => {

    moxios.stubRequest(`${BASE_URL}/users/activate/?uid=1&token=56v-b4048f12ea77edab35d5`, {
      status: 409,
      error: {},
    });

    await store.dispatch(activateUser('1', '56v-b4048f12ea77edab35d5'));
    expect(store.getActions()[0].type).toEqual(`${SIGNUP_USER}_ACTIVATION_FAILURE`);
    done();
  });

});
