import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import { createBrowserHistory } from 'history';
import { GET_ONE_ARTICLE, UPDATE_ARTICLE, BASE_URL } from '../src/redux/constants';
import {
  getSingleArticle,
  updateArticle,
} from '../src/redux/actions/UpdateArticleAction';

describe.only('unit tests for updateArticle actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  beforeEach(() => {
    moxios.install();
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const article = {
    author: 'test_user',
    body: 'an test article',
    title: 'test',
  };

  const history = createBrowserHistory();

  it('returns UPDATE_ARTICLE_SUCCESS on successful article update', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/test/`, {
      status: 201,
      data: {},
    });

    await store.dispatch(updateArticle(article, 'test', history));
    expect(store.getActions()[1].type).toEqual(`${UPDATE_ARTICLE}_SUCCESS`);
    done();
  });


  it('returns UPDATE_ARTICLE_FAILURE on failure article update', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/tesdsst/`, {
      status: 404,
      error: 'Article with slug tesdsst not found',
    });

    await store.dispatch(updateArticle(article, 'tesdsst', history));
    expect(store.getActions()[1].type).toEqual(`${UPDATE_ARTICLE}_FAILURE`);
    done();
  });

  it('returns GET_ONE_ARTICLE_SUCCESS on successfully getting one article', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/test/`, {
      status: 201,
      data: {},
    });

    await store.dispatch(getSingleArticle('test', history));
    expect(store.getActions()[1].type).toEqual(`${GET_ONE_ARTICLE}_SUCCESS`);
    done();
  });

  it('returns GET_ONE_ARTICLE_FAILURE on failure to get an article', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/tesdsst/`, {
      status: 404,
      error: 'Article with slug tesdsst not found',
    });

    await store.dispatch(getSingleArticle('tesdsst', history));
    expect(store.getActions()[1].type).toEqual(`${GET_ONE_ARTICLE}_FAILURE`);
    done();
  });
});
