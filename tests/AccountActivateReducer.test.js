import accountActivateReducer from '../src/redux/reducers/ActivateAccountReducer';
import { SIGNUP_USER } from '../src/redux/constants';

describe('unit tests for account activation', () => {
  const initialState = {
    isLoading: false,
    message: {},
    error: {},
  };

  it('it resorts to default state', () => {
    const action = {
      type: `${SIGNUP_USER}_DOES_NOT_EXIST`,
    };
    const newState = accountActivateReducer(initialState, action);
    const excpectedState = {
      ...initialState,
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets activation success message', () => {
    const action = {
      type: `${SIGNUP_USER}_ACTIVATION_SUCCESS`,
      response: 'successful',
    };
    const newState = accountActivateReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      message: 'successful',
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets error response', () => {
    const action = {
      type: `${SIGNUP_USER}_ACTIVATION_FAILURE`,
      error: { response: { data: 'failure' } },
    };
    const newState = accountActivateReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      error: 'failure',
    };
    expect(newState).toEqual(excpectedState);
  });
});
