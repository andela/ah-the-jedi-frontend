import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { OptInOutAction, NotifyStatusAction } from '../src/redux/actions/NotificationsOptinAction';
import { OPTINOUT } from '../src/redux/constants';

/*
 * Defines tests for notificcation actions:
 * Test for successful and unsuccessful dispatch of action
 */

const mockData = {
  data: {
    email: false,
    app: false,
  },
  response: {
    subscriptions: {
      email: true,
      app: true,
    }
  },
  status: 200,
  error: {
    status: 404,
  },
};

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('test notification actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  /**
   * fetch notification settings actions
   */
  it('tests for successful get notifications status action', () => {
    const { response } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [{ type: OPTINOUT }, { type: `${OPTINOUT}_SUCCESS`, response }];

    const store = mockStore({});

    return store
      .dispatch(NotifyStatusAction())
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful get notification status action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.status,
      });
    });

    const expectedActions = { type: `${OPTINOUT}_FAILURE`, error: error.status };

    const store = mockStore({});

    return store.dispatch(NotifyStatusAction()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });

  /**
   * change notification settings actions
   */
  it('tests for successful change of notifications action', () => {
    const { response, data } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [{ type: OPTINOUT }, { type: `${OPTINOUT}_SUCCESS`, response }];

    const store = mockStore({});

    return store
      .dispatch(OptInOutAction(data))
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful change of notification settings action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.status,
      });
    });

    const expectedActions = { type: `${OPTINOUT}_FAILURE`, error: error.status };

    const store = mockStore({});

    return store.dispatch(OptInOutAction()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });

});
