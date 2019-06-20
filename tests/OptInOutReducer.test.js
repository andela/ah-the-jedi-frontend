import expect from 'expect';
import { OptInOutReducer, NotifyStatusReducer } from '../src/redux/reducers/NotificationsOptinOutReducer';
import {
  OPTINOUT
} from '../src/redux/constants';

/*
 * Defines the change notifications reducer tests:
 */

const mockData = {
  response: {
      subscriptions: {
        email: true,
        app: true,
      },
    status: 200,
  },
  error: {
    status: 404,
  },
};
describe('test fetch notification settings reducer', () => {
  it('should return default state', () => {
    const startAction = {
      type: OPTINOUT,
    };
    const state = NotifyStatusReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle get all notification settings success request', () => {
    const successAction = {
      type: `${OPTINOUT}_SUCCESS`,
      response: mockData.response,
    };
    const state = NotifyStatusReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle get notification settings request failure', () => {
    const failureAction = {
      type: `${OPTINOUT}_FAILURE`,
      error: mockData.error,
    };
    const state = NotifyStatusReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});


describe('test change notification settings reducer', () => {
  it('should return default state', () => {
    const startAction = {
      type: OPTINOUT,
    };
    const state = OptInOutReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle post notification settings success request', () => {
    const successAction = {
      type: `${OPTINOUT}_SUCCESS`,
      response: mockData.response,
    };
    const state = OptInOutReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle post notification settings request failure', () => {
    const failureAction = {
      type: `${OPTINOUT}_FAILURE`,
      error: mockData.error,
    };
    const state = OptInOutReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});
