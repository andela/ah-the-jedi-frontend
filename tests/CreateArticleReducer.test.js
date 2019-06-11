import CreateArticleReducer from '../src/redux/reducers/CreateArticleReducer';
import { CREATE_ARTICLE } from '../src/redux/constants';

describe.only('unit tests for create article reducer', () => {
  const initialState = {
    isLoading: false,
    message: {},
    error: {},
  };

  it('changes isLoading to true', () => {
    const action = {
      type: CREATE_ARTICLE,
    };
    const newState = CreateArticleReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      isLoading: true,
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets success message', () => {
    const action = {
      type: `${CREATE_ARTICLE}_SUCCESS`,
      response: 'successful',
    };
    const newState = CreateArticleReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      message: 'successful',
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets error response', () => {
    const action = {
      type: `${CREATE_ARTICLE}_FAILURE`,
      error: { response: { data: 'failure' } },
    };
    const newState = CreateArticleReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      error: 'failure',
    };
    expect(newState).toEqual(excpectedState);
  });
});
