import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import { createBrowserHistory } from 'history';
import { CREATE_ARTICLE, BASE_URL } from '../src/redux/constants';
import { createArticle } from '../src/redux/actions/CreateArticleAction';

describe('unit tests for createArticle actions', () => {
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

  it('returns UPDATE_ARTICLE_SUCCESS on successful creation of an article', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/`, {
      status: 201,
      response: {
        count: 1,
        results: [article],
      },
    });

    await store.dispatch(createArticle(article, history));
    expect(store.getActions()[1].type).toEqual(`${CREATE_ARTICLE}_SUCCESS`);
    done();
  });


  it('returns UPDATE_ARTICLE_FAILURE on failure article update', async (done) => {
    moxios.stubRequest(`${BASE_URL}/articles/`, {
      status: 404,
      error: 'Authentication credentials not provided',
    });

    await store.dispatch(createArticle(article, history));
    expect(store.getActions()[1].type).toEqual(`${CREATE_ARTICLE}_FAILURE`);
    done();
  });
});
