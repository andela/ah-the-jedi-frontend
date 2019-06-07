import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  fetchArticles,
  fetchOneArticle,
  fetchByAuthor,
  deleteArticle,
} from '../src/redux/actions/FetchArticlesActions';
import { FETCH_ARTICLES, DELETE_ARTICLE } from '../src/redux/constants';

/*
 * Defines tests for search action:
 * Test for successful and unsuccessful dispatch of action
 */

const mockData = {
  response: [
    {
      article_readers: null,
      author: { id: 2, email: 'test@gmail.com', username: 'benkim' },
      average_rating: 0,
      body: 'For a long t',
      comments: [],
      created_at: '2019-05-17T09:36:56.730080Z',
      description: 'Felis catus; from the beginning till now..',
      facebook: 'http://www.facebook.com/sharer.php',
      favorited: false,
      favorites_count: 0,
      highlights: null,
      id: 9,
      image: '',
      readtime: '1 min',
      slug: 'the-history-of-the-domestic-cats-delete',
      tag_list: [],
      title: 'The History Of The Domestic Cats delete',
      updated_at: '2019-06-10T15:47:10.537978Z',
    },
  ],
  status: 200,
  error: {
    status: 404,
    message: 'Request failed with status code 404',
  },
};

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('test get all articles actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests for successful fetch all articles action', () => {
    const { response } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [
      { type: FETCH_ARTICLES },
      { type: `${FETCH_ARTICLES}_SUCCESS`, response },
    ];

    const store = mockStore({});

    return store
      .dispatch(fetchArticles())
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful fetch of all articles', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.status,
      });
    });

    const expectedActions = {
      type: `${FETCH_ARTICLES}_FAILURE`,
      error: error.status,
    };

    const store = mockStore({});

    return store.dispatch(fetchArticles()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });


  it('tests for successful get one action', () => {
    const { response } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [
      { type: FETCH_ARTICLES },
      { type: `${FETCH_ARTICLES}_SUCCESS_FOR_ONE`, response },
    ];

    const store = mockStore({});
    const { slug } = response[0];

    return store
      .dispatch(fetchOneArticle(slug))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful fetch of one articles', () => {
    const error = mockData.error.message;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.status,
      });
    });

    const expectedActions = [
      { type: FETCH_ARTICLES },
      { type: `${FETCH_ARTICLES}_FAILURE_FOR_ONE`, error },
    ];

    const store = mockStore({});

    return store.dispatch(fetchOneArticle()).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });


  it('tests for successful get author articles', () => {
    const { response } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [
      { type: FETCH_ARTICLES },
      { type: `${FETCH_ARTICLES}_SUCCESS_FOR_AUTHOR`, response },
    ];

    const store = mockStore({});
    const author = 'benkim';

    return store
      .dispatch(fetchByAuthor(author))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful fetch of one articles', () => {
    const error = mockData.error.message;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.status,
      });
    });

    const expectedActions = [
      { type: FETCH_ARTICLES },
      { type: `${FETCH_ARTICLES}_FAILURE_FOR_AUTHOR`, error },
    ];

    const store = mockStore({});
    const author = 'benkim';

    return store.dispatch(fetchByAuthor(author)).catch(() => {
      expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    });
  });

  it('tests for successful delete of articles', () => {
    const { response } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [
      { type: DELETE_ARTICLE },
      { type: `${DELETE_ARTICLE}_SUCCESS`, response },
    ];

    const store = mockStore({});
    const { slug } = response[0];

    return store
      .dispatch(deleteArticle(slug))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
