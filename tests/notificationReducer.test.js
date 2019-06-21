import notificationReducer from '../src/redux/reducers/notificationReducer';
import { NOTIFICATIONS } from '../src/redux/constants';

describe('Unit Test for notification reducer', () => {
  it('actions types and payload are dispatched successfully', () => {
    const action = {
      type: `${NOTIFICATIONS}_SUCCESS`,
      response: {
        notifications: {
          notifications: [
            {
              url:
                'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
              message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
              created_at: '2019-06-20 18:22:06',
              id: 528,
              read: true,
            },
          ],
        },
      },
    };
    expect(notificationReducer({}, action)).toEqual({
      isLoading: false,
      notifications: {
        notifications: {
          notifications: [
            {
              url:
                'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
              message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
              created_at: '2019-06-20 18:22:06',
              id: 528,
              read: true,
            },
          ],
        },
      },
    });
  });

  it('actions types and payload are dispatched successfully', () => {
    const action = {
      type: `UNREAD_${NOTIFICATIONS}_SUCCESS`,
      response: {
        notifications: {
          notifications: [
            {
              url:
                'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
              message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
              created_at: '2019-06-20 18:22:06',
              id: 528,
              read: true,
            },
          ],
        },
      },
    };
    expect(notificationReducer({}, action)).toEqual({
      isLoading: false,
      unread: {
        notifications: {
          notifications: [
            {
              url:
                'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
              message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
              created_at: '2019-06-20 18:22:06',
              id: 528,
              read: true,
            },
          ],
        },
      },
    });
  });

  it('actions types and payload are dispatched successfully', () => {
    const action = {
      type: `READ_${NOTIFICATIONS}_SUCCESS`,
      response: {
        read: true,
      },
    };
    expect(notificationReducer({}, action)).toEqual({
      isLoading: false,
      read: true,
    });
  });

  it('test failed fetch with errors', () => {
    const action = {
      type: `${NOTIFICATIONS}_FAILURE`,
      error: {
        error: 'error',
      },
    };
    expect(notificationReducer({}, action)).toEqual({
      error: action.error,
      isLoading: false,
      read: false,
    });
  });
});
