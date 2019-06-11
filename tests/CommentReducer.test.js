import FetchCommentsReducer from '../src/redux/reducers/FetchCommentsReducer';
import CreateCommentReducer from '../src/redux/reducers/createCommentReducer';
import { FETCH_COMMENT, CREATE_COMMENT } from '../src/redux/constants';

describe('fetch comments reducer', () => {
  it('should return the initial state', () => {
    expect(FetchCommentsReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      data: {},
      error: {},
      isLoading: true,
    });
  });

  it('should handle fetch comments', () => {
    expect(
      FetchCommentsReducer([], {
        type: FETCH_COMMENT,
      }),
    ).toEqual({ isLoading: true });

    expect(
      FetchCommentsReducer(
        [
          {
            comment: 'I like this comment',
          },
        ],
        {
          type: `${FETCH_COMMENT}_SUCCESS`,
        },
      ),
    ).toEqual({
      0: { comment: 'I like this comment' },
      data: undefined,
      isAuthenticated: true,
      isLoading: false,
    });
  });
});

describe('create comments reducer', () => {
  it('should return the initial state', () => {
    expect(CreateCommentReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      data: {},
      error: {},
      isLoading: false,
    });
  });

  it('should handle post comments', () => {
    expect(
      CreateCommentReducer([], {
        type: `${CREATE_COMMENT}`,
      }),
    ).toEqual({
      isLoading: true,
    });

    expect(
      CreateCommentReducer(
        [
          {
            comment: 'i like the article',
          },
        ],
        {
          type: `${CREATE_COMMENT}_SUCCESS`,
        },
      ),
    ).toEqual({
      0: {
        comment: 'i like the article',
      },
      data: undefined,
      isAuthenticated: true,
      isLoading: false,
    });
  });
});
