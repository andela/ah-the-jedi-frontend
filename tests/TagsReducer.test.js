import expect from 'expect';
import TagsReducer from '../src/redux/reducers/TagsReducer';
import { GET_TAGS } from '../src/redux/constants';

/*
 * Defines the tags reducer tests:
 */

const mockData = {
  response: {
    message: {
      data: {
        Tags: ['test', 'here', 'again'],
      },
    },
    status: 200,
  },
  error: {
    message: 'There are no tags available',
  },
};
describe('test tags reducer', () => {
  it('should handle tags get request start', () => {
    const startAction = {
      type: GET_TAGS,
    };
    const state = TagsReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });
  it('should handle tags get request success', () => {
    const successAction = {
      type: `${GET_TAGS}_SUCCESS`,
      response: mockData.response,
    };
    const state = TagsReducer({}, successAction);
    expect(state).toEqual({
      isLoading: false,
      message: mockData.response,
    });
  });

  it('should handle tags get request failure', () => {
    const failureAction = {
      type: `${GET_TAGS}_FAILURE`,
      error: undefined,
    };
    const state = TagsReducer({}, failureAction);
    expect(state).toEqual({
      error: undefined,
      isLoading: false,
    });
  });
});
