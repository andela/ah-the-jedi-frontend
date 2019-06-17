import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import { CREATE_COMMENT, BASE_URL } from '../src/redux/constants';
import { createComment, createThreadComment } from '../src/redux/actions/CreateCommentAction';
import { initialState } from '../src/redux/reducers/createCommentReducer';

describe('unit tests for create comment actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initialState);

  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const comment = {
    comment: 'test comment',
    id: 1,
  };

  const controlComment = {
    comment: 'test comment',
    id: 1000,
  };

  it('returns CREATE_COMMENT_SUCCESS on successful post', async done => {
    moxios.stubRequest(`${BASE_URL}/articles/first-test-data-2/comments/`, {
      status: 201,
      response: {},
    });

    await store.dispatch(createComment(comment, 'first-test-data-2'));
    expect(store.getActions()[1].type).toEqual(`${CREATE_COMMENT}_SUCCESS`);
    done();
  });

  it('returns CREATE_COMMENT_SUCCESS on successful thread post', () => {
    store.dispatch(createThreadComment(comment));
    expect(store.getActions()[0].type).toEqual(`${CREATE_COMMENT}`);
  });

  it('returns CREATE_COMMENT_FAILURE on failure thread post', async done => {
    moxios.stubRequest(`${BASE_URL}/articles/first-test-data-2/comments/?parent_id=1000`, {
      status: 404,
      response: {},
    });

    await store.dispatch(createThreadComment(controlComment, 'first-test-data-2'));
    expect(store.getActions()[1].type).toEqual(`${CREATE_COMMENT}_FAILURE`);
    done();
  });

  it('returns CREATE_COMMENT_FAILURE on failure post', async done => {
    moxios.stubRequest(`${BASE_URL}/articles/first-test-data-2/comments/`, {
      status: 404,
      response: {},
    });

    await store.dispatch(createComment(controlComment, 'first-test-data-2'));
    expect(store.getActions()[1].type).toEqual(`${CREATE_COMMENT}_FAILURE`);
    done();
  });
});
