import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { BOOKMARK } from '../src/redux/constants';
import {
  unbookmarkArticle,
  bookmarkArticle,
  fetchBookmark,
  setBookmarked,
} from '../src/redux/actions/bookmarkActions';

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
    author: 'elisha.misoi@andela.com',
    title: 'Buick Enclave',
    slug: 'buick-enclave-2',
    description: 'All new Buik Enclave',
    bookmarked_at: '2019-06-19T07:07:47.511529Z',
    image: 'http://res.cloudinary.com/do8v0ew77/image/upload/v1560504380/jprhajdteo2ncla739fs.jpg',
  };

  const unbookmarkData = {
    data: 'Article unbookmarked successfully',
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

  it('test successful fetch profile actions', () => {
    const { slug } = data;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          data,
        },
      });
    });

    const expectedActions = [{ type: BOOKMARK }, { type: `${BOOKMARK}_SUCCESS`, data }];

    return store
      .dispatch(bookmarkArticle(slug))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('test bookmark actions with errors', () => {
    const { slug } = data;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          error: 'You already bookmarked this article',
        },
      });
    });

    const expectedActions = [{ type: BOOKMARK }, { type: `${BOOKMARK}_FAILURE`, error }];

    return store.dispatch(bookmarkArticle(slug)).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('test successful  unbookmark actions', () => {
    const { slug } = data;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          unbookmarkData,
        },
      });
    });

    const expectedActions = [{ type: BOOKMARK }, { type: `UN${BOOKMARK}_SUCCESS`, unbookmarkData }];

    return store
      .dispatch(unbookmarkArticle(slug))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('test unbookmark with errors', () => {
    const { slug } = data;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          error: 'Article with slug buick-enclave-2 not found',
        },
      });
    });

    const expectedActions = [{ type: BOOKMARK }, { type: `UN${BOOKMARK}_FAILURE`, error }];

    return store.dispatch(unbookmarkArticle(slug)).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('test successful fetch bookmarks actions', () => {
    const { slug } = data;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          bookmarkedData,
        },
      });
    });

    const expectedActions = [
      { type: BOOKMARK },
      { type: `FETCH_${BOOKMARK}_SUCCESS`, bookmarkedData },
    ];

    return store
      .dispatch(fetchBookmark(slug))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('test successful set bookmarked actions', () => {
    const { slug } = data;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          error,
        },
      });
    });

    const expectedActions = [{ type: BOOKMARK }, { type: `MARK_${BOOKMARK}_SUCCESS`, error }];

    return store.dispatch(setBookmarked(slug)).catch(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
