import signUpReducer from '../src/redux/reducers/SignUpReducer';
import { SIGNUP_USER } from '../src/redux/constants';

describe.only('unit tests for signup reducer', () => {
  const initialState = {
    isLoading: false,
    message: {},
    error: {},
  };

  it('changes isLoading to true', () => {
    const action = {
      type: SIGNUP_USER,
    };
    const newState = signUpReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      isLoading: true,
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets success message', () => {
    const action = {
      type: `${SIGNUP_USER}_SEND_VERIFICATION_SUCCESS`,
      response: 'successful',
    };
    const newState = signUpReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      message: 'successful',
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets error response', () => {
    const action = {
      type: `${SIGNUP_USER}_SEND_VERIFICATION_FAILURE`,
      error: { response: { data: 'failure' } },
    };
    const newState = signUpReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      error: 'failure',
    };
    expect(newState).toEqual(excpectedState);
  });
});
