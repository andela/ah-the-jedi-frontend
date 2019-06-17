import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { fetchTags } from '../src/redux/actions/TagsAction';
import { GET_TAGS } from '../src/redux/constants';

/*
 * Defines tests for fetch tags action:
 * Test for successful and unsuccessful dispatch of action
 */

const mockData = {
  response: [
    {
      Tags: ['test', 'here', 'again'],
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

describe('test fetch tags actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('tests for successful fetch tags action', () => {
    const { response } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response,
      });
    });

    const expectedActions = [{ type: GET_TAGS }, { type: `${GET_TAGS}_SUCCESS`, response }];

    const store = mockStore({});

    return store
      .dispatch(fetchTags())
      .then(() => {
        expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
      })
      .catch(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('tests for unsuccessful fetch tags action', () => {
    const { error } = mockData;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.response.data.message,
      });
    });

    const expectedActions = { type: `${GET_TAGS}_FAILURE`, error: error.response.data.message };

    const store = mockStore({});

    return store.dispatch(fetchTags()).catch(() => {
      expect(error.response.data).toEqual(expectedActions.type);
    });
  });
});
