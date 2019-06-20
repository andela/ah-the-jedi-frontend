import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { NOTIFICATIONS } from '../src/redux/constants';
import {
  fetchUnreadNotifications,
  fetchAllNotifications,
  setRead,
} from '../src/redux/actions/notificationActions';

describe('Test Bookmark actions', () => {
  const testStore = configureMockStore([thunk]);
  const store = testStore({});

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const data = {
    next: 'https://ah-the-jedi-backend-staging.herokuapp.com/api/notifications/all?page=2',
    previous: null,
    count: 37,
    notifications: [
      {
        url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
        message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
        created_at: '2019-06-20 18:22:06',
        id: 528,
        read: true,
      },
      {
        url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
        message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
        created_at: '2019-06-20 18:22:02',
        id: 527,
        read: true,
      },
      {
        url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
        message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
        created_at: '2019-06-20 18:21:57',
        id: 526,
        read: false,
      },
      {
        url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
        message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
        created_at: '2019-06-20 18:21:51',
        id: 525,
        read: false,
      },
      {
        url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
        message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
        created_at: '2019-06-20 18:21:19',
        id: 524,
        read: false,
      },
      {
        url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
        message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
        created_at: '2019-06-20 18:21:17',
        id: 523,
        read: false,
      },
      {
        url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
        message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
        created_at: '2019-06-20 13:40:14',
        id: 512,
        read: true,
      },
      {
        url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
        message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
        created_at: '2019-06-20 13:40:11',
        id: 511,
        read: false,
      },
      {
        url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
        message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
        created_at: '2019-06-20 12:52:16',
        id: 507,
        read: false,
      },
    ],
  };

  const readData = {
    notification: {
      url:
        'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/toni-morrison-is-the-greatest-living-author/',
      message: "Alv0 responded to 'Toni Morrison Is the Greatest Living Author'.",
      created_at: '2019-06-14 07:32:21',
      id: 183,
      read: true,
    },
  };

  const bookmarkedData = [
    {
      author: 'dibox',
      title: '320 eye',
      slug: '320-eye',
      description: 'The BMW 320i',
      bookmarked_at: '2019-06-18T12:39:25.610462Z',
      image:
        'http://res.cloudinary.com/do8v0ew77/image/upload/v1560771917/ka7txqd5rkpo4qsv8owm.jpg',
    },
    {
      author: 'jkamzz',
      title: 'stats demo me',
      slug: 'stats-demo-me',
      description: 'Ever wonder how?',
      bookmarked_at: '2019-06-18T12:40:43.379858Z',
      image: '',
    },
  ];

  const error = {
    status: 404,
    message: 'Request failed with status code 404',
  };

  const unauthorized = {
    status: 401,
    message: 'Request failed with status code 401',
  };

  it('test successful fetch of all notifications actions', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data,
      });
    });

    const expectedActions = [{ type: NOTIFICATIONS }, { type: `${NOTIFICATIONS}_SUCCESS`, data }];

    return store
      .dispatch(fetchAllNotifications())
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('test successful fetch of all unread notifications actions', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: data,
      });
    });

    const expectedActions = [
      { type: NOTIFICATIONS },
      { type: `UNREAD_${NOTIFICATIONS}_SUCCESS`, data },
    ];

    return store
      .dispatch(fetchUnreadNotifications())
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('test unsuccesful mark read with errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: 'This notification does not exist',
          status: '404',
        },
      });
    });

    const expectedActions = [{ type: NOTIFICATIONS }, { type: `${NOTIFICATIONS}_FAILURE`, error }];

    return store.dispatch(setRead(0)).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('test unsuccesful fetch read notifications with errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          detail: 'Signature has expired.',
        },
      });
    });

    const expectedActions = [
      { type: NOTIFICATIONS },
      { type: `${NOTIFICATIONS}_FAILURE`, unauthorized },
    ];

    return store.dispatch(fetchAllNotifications()).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('test unsuccesful fetch unread notifications with unauthorized errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          detail: 'Signature has expired.',
        },
      });
    });

    const expectedActions = [
      { type: NOTIFICATIONS },
      { type: `${NOTIFICATIONS}_FAILURE`, unauthorized },
    ];

    return store.dispatch(fetchUnreadNotifications()).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('test unsuccesful set notifications with unauthorized errors', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {
          detail: 'Signature has expired.',
        },
      });
    });

    const expectedActions = [
      { type: NOTIFICATIONS },
      { type: `${NOTIFICATIONS}_FAILURE`, unauthorized },
    ];

    return store.dispatch(setRead(50)).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('test successful set read notifications actions', () => {
    const {
      notification: { id },
    } = readData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          readData,
        },
      });
    });

    const expectedActions = [
      { type: NOTIFICATIONS },
      { type: `READ_${NOTIFICATIONS}_SUCCESS`, readData },
    ];

    return store.dispatch(setRead(id)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
