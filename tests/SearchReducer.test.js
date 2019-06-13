import expect from 'expect';
import searchReducer from '../src/redux/reducers/SearchReducer';
import { SEARCH } from '../src/redux/constants';

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
    response: {
      data: {
        message: 'We could not find what you are looking for.',
      },
    },
    status: 404,
  },
};
describe('test search reducer', () => {
  it('should handle search get request start', () => {
    const startAction = {
      type: SEARCH,
    };
    const state = searchReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });
  it('should handle search get request success', () => {
    const successAction = {
      type: `${SEARCH}_SUCCESS`,
      response: mockData.response,
    };
    const state = searchReducer({}, successAction);
    expect(state).toEqual({
      isLoading: false,
      message: mockData.response.data.results,
      error: {},
    });
  });

  it('should handle search get request failure', () => {
    const failureAction = {
      type: `${SEARCH}_FAILURE`,
      error: mockData.error,
    };
    const state = searchReducer({}, failureAction);
    expect(state).toEqual({
      error: mockData.error.response.data.message,
      isLoading: false,
    });
  });
});
