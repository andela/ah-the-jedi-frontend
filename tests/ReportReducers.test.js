import expect from 'expect';
import ReportsReducer from '../src/redux/reducers/ CreateReportReducer';
import {
  FETCH_REPORT, DELETE_REPORT, UPDATE_REPORT, CREATE_REPORT,
} from '../src/redux/constants';

/*
 * Defines the report article reducer tests:
 */

const mockData = {
  response: {
    data: {
      results: [
        {
          id: 55,
          reporter: {
            id: 2,
            username: 'benkim',
            email: 'benkimeric@gmail.com',
          },
          reported_article: {
            id: 116,
            slug: 'subrau-crosstrek-3',
            title: 'Subrau Crosstrek',
            description: 'All new Subaru Crosstrek',
            author: {
              id: 65,
              email: 'test@andela.com',
              username: 'test@andela.com',
            },
          },
          reason: 'plag',
          created_at: '2019-06-19T10:23:22.501232Z',
          updated_at: '2019-06-19T10:23:22.501280Z',
        },
      ],
    },
    status: 200,
  },
  error: {
    status: 404,
  },
};
describe('test fetch reports reducer', () => {
  it('should return default state', () => {
    const startAction = {
      type: FETCH_REPORT,
    };
    const state = ReportsReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle get all reports success request', () => {
    const successAction = {
      type: `${FETCH_REPORT}_SUCCESS`,
      response: mockData.response,
    };
    const state = ReportsReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle get articles request failure', () => {
    const failureAction = {
      type: `${FETCH_REPORT}_FAILURE`,
      error: mockData.error,
    };
    const state = ReportsReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});

describe('test delete article reducer', () => {
  it('should return default state for deleting aricles', () => {
    const startAction = {
      type: DELETE_REPORT,
    };
    const state = ReportsReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle delete article success request', () => {
    const successAction = {
      type: `${DELETE_REPORT}_SUCCESS`,
      response: mockData.response,
    };
    const state = ReportsReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle get author article request failure', () => {
    const failureAction = {
      type: `${DELETE_REPORT}_FAILURE`,
      error: mockData.error,
    };
    const state = ReportsReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});

describe('test update report  reducer', () => {
  it('should return default state for updating aricles', () => {
    const startAction = {
      type: UPDATE_REPORT,
    };
    const state = ReportsReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle update report success request', () => {
    const successAction = {
      type: `${UPDATE_REPORT}_SUCCESS`,
      response: mockData.response,
    };
    const state = ReportsReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle get update report request failure', () => {
    const failureAction = {
      type: `${UPDATE_REPORT}_FAILURE`,
      error: mockData.error,
    };
    const state = ReportsReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});

describe('test create report  reducer', () => {
  it('should return default state for updating aricles', () => {
    const startAction = {
      type: CREATE_REPORT,
    };
    const state = ReportsReducer({}, startAction);
    expect(state).toEqual({
      isLoading: true,
    });
  });

  it('should handle create report success request', () => {
    const successAction = {
      type: `${CREATE_REPORT}_SUCCESS`,
      response: mockData.response,
    };
    const state = ReportsReducer({}, successAction);
    expect(state.isLoading).toEqual(false);
  });

  it('should handle get create report request failure', () => {
    const failureAction = {
      type: `${CREATE_REPORT}_FAILURE`,
      error: mockData.error,
    };
    const state = ReportsReducer({}, failureAction);
    expect(state.isLoading).toEqual(false);
  });
});
