import expect from 'expect';
import passwordConfirmReducer from '../src/redux/reducers/passwordConfirmReducer';
import { PASSWORD_CONFIRM } from '../src/redux/constants';

/*
 * Defines the password confirm reducer tests:
 */

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
    error: 'Password must be alphanumeric with a minimum of 8 characters.',
  },
};
describe.only('test password confirm reducer', () => {
  it('should handle search get request start', () => {
    const startAction = {
      type: PASSWORD_CONFIRM,
    };
    const state = passwordConfirmReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle password confirm post request success', () => {
    const successAction = {
      type: `${PASSWORD_CONFIRM}_SUCCESS`,
      response: mockData.response.data.user.message,
    };
    const state = passwordConfirmReducer({}, successAction);
    expect(state).toEqual({
      isLoading: false,
      message: mockData.response.data.user.message,
    });
  });

  it('should handle password confirm post request failure', () => {
    const state = passwordConfirmReducer(
      {},
      {
        type: `${PASSWORD_CONFIRM}_FAILURE`,
        error: {
          response: {
            data: {
              message:
                'A password should be only Aplhanumeric characters and a minimum of 8 characters',
            },
          },
        },
      },
    );
    expect(state).toEqual({
      error: {
        data: {
          message:
            'A password should be only Aplhanumeric characters and a minimum of 8 characters',
        },
      },
      isLoading: false,
    });
  });
});
