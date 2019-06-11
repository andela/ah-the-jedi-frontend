import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { search } from '../src/redux/actions/SearchAction';
import { SEARCH } from '../src/redux/constants';

/*
 * Defines tests for search action:
 * Test for successful and unsuccessful dispatch of action
 */

const mockData = {
  searchData: {
    search: 'lorem',
  },
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
    response: {
      data: {
        message: 'We could not find what you are looking for.',
      },
    },
    status: 404,
  },
};

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('test search actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests for successful get action', () => {
    const { response, searchData } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [{ type: SEARCH }, { type: `${SEARCH}_SUCCESS`, response }];

    const store = mockStore({});
    const query = 'search';
    const data = searchData.search;

    return store
      .dispatch(search(query, data))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful search action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.response.data.message,
      });
    });

    const expectedActions = { type: `${SEARCH}_FAILURE`, error: error.response.data.message };

    const store = mockStore({});

    return store.dispatch(search()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });
});
