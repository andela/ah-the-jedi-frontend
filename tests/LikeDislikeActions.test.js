import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import { createBrowserHistory } from 'history';
import { LIKE_ARTICLE, DISLIKE_ARTICLE, BASE_URL } from '../src/redux/constants';
import {
  likeArticle,
  dislikeArticle,
} from '../src/redux/actions/FetchArticlesActions';

describe('defines test suit for like and dislike of articles', () => {
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

  const history = createBrowserHistory();

  it('returns LIKE_ARTICLE_SUCCESS on successful like of an article', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/stats-demo-meeme/like/`, {
      status: 200,
      response: {},
    });

    await store.dispatch(likeArticle('stats-demo-meeme', history));
    expect(store.getActions()[0].type).toEqual(`${LIKE_ARTICLE}_SUCCESS`);
    done();
  });

  it('returns LIKE_ARTICLE_FAILURE on failure like of an article', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/stats-demo-meeme/like/`, {
      status: 401,
      response: {},
    });

    await store.dispatch(likeArticle('stats-demo-meeme', history));
    expect(store.getActions()[0].type).toEqual(`${LIKE_ARTICLE}_FAILURE`);
    done();
  });

  it('returns DISLIKE_ARTICLE_SUCCESS on successful like of an article', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/stats-demo-meeme/dislike/`, {
      status: 200,
      response: {},
    });

    await store.dispatch(dislikeArticle('stats-demo-meeme', history));
    expect(store.getActions()[0].type).toEqual(`${DISLIKE_ARTICLE}_SUCCESS`);
    done();
  });

  it('returns DISLLIKE_ARTICLE_FAILURE on failure like of an article', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/stats-demo-meeme/dislike/`, {
      status: 401,
      response: {},
    });

    await store.dispatch(dislikeArticle('stats-demo-meeme', history));
    expect(store.getActions()[0].type).toEqual(`${DISLIKE_ARTICLE}_FAILURE`);
    done();
  });
});
