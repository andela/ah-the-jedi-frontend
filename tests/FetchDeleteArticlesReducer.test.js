import expect from 'expect';
import FetchArticlesReducer from '../src/redux/reducers/FetchArticlesReducer';
import {
 FETCH_ARTICLES, DELETE_ARTICLE, LIKE_ARTICLE, DISLIKE_ARTICLE
} from '../src/redux/constants';

/*
 * Defines the search reducer tests:
 * Tests for successful change of state
 */

const mockData = {
  searchData: {
    search: 'lorem',
  },
  response: {
    data: {
      results: [
        {
          article_readers: null,
          author: { id: 2, email: 'benkimeric@gmail.com', username: 'benkim' },
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
    },
    status: 200,
  },
  error: {
    status: 404,
  },
};
describe('test fetch article reducer', () => {
  it('should return default state', () => {
    const startAction = {
      type: FETCH_ARTICLES,
    };
    const state = FetchArticlesReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle get all articles success request', () => {
    const successAction = {
      type: `${FETCH_ARTICLES}_SUCCESS`,
      response: mockData.response,
    };
    const state = FetchArticlesReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle get articles request failure', () => {
    const failureAction = {
      type: `${FETCH_ARTICLES}_FAILURE`,
      error: mockData.error,
    };
    const state = FetchArticlesReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});

describe('test fetch one article reducer', () => {
  it('should handle get one articles success request', () => {
    const successAction = {
      type: `${FETCH_ARTICLES}_SUCCESS_FOR_ONE`,
      response: mockData.response,
    };
    const state = FetchArticlesReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle get article request failure', () => {
    const failureAction = {
      type: `${FETCH_ARTICLES}_FAILURE_FOR_ONE`,
      error: mockData.error,
    };
    const state = FetchArticlesReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});

describe('test fetch author article reducer', () => {
  it('should handle get author articles success request', () => {
    const successAction = {
      type: `${FETCH_ARTICLES}_SUCCESS_FOR_AUTHOR`,
      response: mockData.response,
    };
    const state = FetchArticlesReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle get author article request failure', () => {
    const failureAction = {
      type: `${FETCH_ARTICLES}_FAILURE_FOR_AUTHOR`,
      error: mockData.error,
    };
    const state = FetchArticlesReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});

describe('test delete article reducer', () => {
  it('should return default state for deleting aricles', () => {
    const startAction = {
      type: DELETE_ARTICLE,
    };
    const state = FetchArticlesReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle delete article success request', () => {
    const successAction = {
      type: `${DELETE_ARTICLE}_SUCCESS`,
      response: mockData.response,
    };
    const state = FetchArticlesReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle get author article request failure', () => {
    const failureAction = {
      type: `${DELETE_ARTICLE}_FAILURE`,
      error: mockData.error,
    };
    const state = FetchArticlesReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle like article success request', () => {
    const successAction = {
      type: `${LIKE_ARTICLE}_SUCCESS`,
      response: mockData.response,
    };
    const state = FetchArticlesReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle like article request failure', () => {
    const failureAction = {
      type: `${LIKE_ARTICLE}_FAILURE`,
      error: mockData.error,
    };
    const state = FetchArticlesReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle dislike article success request', () => {
    const successAction = {
      type: `${DISLIKE_ARTICLE}_SUCCESS`,
      response: mockData.response,
    };
    const state = FetchArticlesReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle dislike article request failure', () => {
    const failureAction = {
      type: `${DISLIKE_ARTICLE}_FAILURE`,
      error: mockData.error,
    };
    const state = FetchArticlesReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});
