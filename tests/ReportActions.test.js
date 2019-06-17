import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { fetchReport, createReport, updateReport, deleteReport } from '../src/redux/actions/ArticlesReportsActions';
import { FETCH_REPORT, CREATE_REPORT, UPDATE_REPORT, DELETE_REPORT } from '../src/redux/constants';

/*
 * Defines tests for reports action:
 * Test for successful and unsuccessful dispatch of action
 */

const mockData = {
  reportData: {
    reason: 'plagiarism',
  },
  response: [
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
  status: 200,
  error: {
    status: 404,
  },
};

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('test report actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  /**
   * fetch reports actions
   */
  it('tests for successful get reports action', () => {
    const { response, reportData } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [{ type: FETCH_REPORT }, { type: `${FETCH_REPORT}_SUCCESS`, response }];

    const store = mockStore({});
    const data = reportData.reason;

    return store
      .dispatch(fetchReport(data))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful get reports action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.status,
      });
    });

    const expectedActions = { type: `${FETCH_REPORT}_FAILURE`, error: error.status };

    const store = mockStore({});

    return store.dispatch(fetchReport()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });

  /**
   * create reports actions
   */
  it('tests for successful create reports action', () => {
    const { response, reportData } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [{ type: CREATE_REPORT }, { type: `${CREATE_REPORT}_SUCCESS`, response }];

    const store = mockStore({});
    const data = reportData.reason;

    return store
      .dispatch(createReport(data))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful create reports action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.status,
      });
    });

    const expectedActions = { type: `${CREATE_REPORT}_FAILURE`, error: error.status };

    const store = mockStore({});

    return store.dispatch(createReport()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });

  /**
   * update reports actions
   */
  it('tests for successful update reports action', () => {
    const { response, reportData } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [{ type: UPDATE_REPORT }, { type: `${UPDATE_REPORT}_SUCCESS`, response }];

    const store = mockStore({});
    const data = reportData.reason;

    return store
      .dispatch(updateReport(data))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful update reports action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.status,
      });
    });

    const expectedActions = { type: `${UPDATE_REPORT}_FAILURE`, error: error.status };

    const store = mockStore({});

    return store.dispatch(updateReport()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });

  /**
   * delete reports actions
   */
  it('tests for successful delete reports action', () => {
    const { response, reportData } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [{ type: DELETE_REPORT }, { type: `${DELETE_REPORT}_SUCCESS`, response }];

    const store = mockStore({});
    const data = reportData.reason;

    return store
      .dispatch(deleteReport(data))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful delete reports action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.status,
      });
    });

    const expectedActions = { type: `${DELETE_REPORT}_FAILURE`, error: error.status };

    const store = mockStore({});

    return store.dispatch(deleteReport()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });
});
