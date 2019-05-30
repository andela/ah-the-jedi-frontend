import thunk from 'redux-thunk';
import {
  signUpActivateSuccess,
  activationFailure,
  activateUser,
} from '../src/redux/actions/ActivateAccountAction';
import { SIGNUP_USER, BASE_URL } from '../src/redux/constants';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import instance from '../axiosconfig';

describe('unit tests for account activation actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  it('it dispatches SIGNUP_USER_ACTIVATION_SUCCESS on account activation', async done => {
    moxios.stubRequest(`${BASE_URL}/users/activate/?uid=1&token=56v-b4048f12ea77edab35d5`, {
      status: 201,
      response: {},
    });
    await store.dispatch(signUpActivateSuccess());
    expect(store.getActions()[0].type).toEqual('SIGNUP_USER_ACTIVATION_SUCCESS');
    done();
  });

  it('returns signup activateSuccess response', () => {
    const newAction = signUpActivateSuccess('success');
    const expectedAction = {
      type: `${SIGNUP_USER}_ACTIVATION_SUCCESS`,
      response: 'success',
    };
    expect(newAction).toEqual(expectedAction);
  });

  it('returns signup activationFailure response', () => {
    const newAction = activationFailure('failure');
    const expectedAction = {
      type: `${SIGNUP_USER}_ACTIVATION_FAILURE`,
      response: 'failure',
    };
    expect(newAction).toEqual(expectedAction);
  });
});
