import expect from 'expect';
import resetPasswordReducer from '../src/redux/reducers/resetPasswordReducer';
import { RESET_PASSWORD } from '../src/redux/constants';

/*
 * Defines the reset password reducer tests:
 * Tests for successful change of state
 */

const mockData = {
  resetPasswordData: {
    email: 'testwere@gmail.com',
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
};
describe.only('test reset password reducer', () => {
  it('should handle search get request start', () => {
    const startAction = {
      type: RESET_PASSWORD,
    };
    const state = resetPasswordReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });
  it('should handle reset password post request success', () => {
    const successAction = {
      type: `${RESET_PASSWORD}_SUCCESS`,
      response: mockData.response.data.message,
    };
    const state = resetPasswordReducer({}, successAction);
    expect(state).toEqual({
      isLoading: false,
      message: mockData.response.data.message,
    });
  });

  it('should handle reset password post request failure', () => {
    const state = resetPasswordReducer(
      {
        reset_password: {
          isLoading: true,
          message: '',
          error: {},
        },
      },
      {
        type: 'RESET_PASSWORD_FAILURE',
        error: { response: { data: { message: 'Account with this email not found.' } } },
      },
    );
    expect(state).toEqual({
      reset_password: { isLoading: true, message: '', error: {} },
      error: { data: { message: 'Account with this email not found.' } },
      isLoading: false,
    });
  });
});
