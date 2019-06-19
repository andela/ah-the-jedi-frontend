import bookmarkReducer from '../src/redux/reducers/bookmarkReducer';
import { BOOKMARK } from '../src/redux/constants';

describe('Unit Test for Bookmark reducer', () => {
  it('actions types and payload are dispatched successfully', () => {
    const action = {
      type: `${BOOKMARK}_SUCCESS`,
      response: {
        bookmarked: true,
      },
    };
    expect(bookmarkReducer({}, action)).toEqual({
      isLoading: false,
      bookmarked: true,
    });
  });

  it('unbookmark actions types and payload are dispatched successfully', () => {
    const action = {
      type: `UN${BOOKMARK}_SUCCESS`,
      response: {
        bookmarked: false,
      },
    };
    expect(bookmarkReducer({}, action)).toEqual({
      isLoading: false,
      bookmarked: false,
    });
  });

  it('mark bookmark actions types and payload are dispatched successfully', () => {
    const action = {
      type: `MARK_${BOOKMARK}_SUCCESS`,
      response: {
        bookmarked: true,
        articles: [{}],
      },
    };
    expect(bookmarkReducer({}, action)).toEqual({
      isLoading: false,
      bookmarked: true,
      articles: [{}],
    });
  });

  it('test failed bookmark with errors', () => {
    const action = {
      type: `${BOOKMARK}_FAILURE`,
      error: {
        error: 'You already bookmarked this article',
      },
    };
    expect(bookmarkReducer({}, action)).toEqual({
      error: action.error,
      isLoading: false,
    });
  });
});
