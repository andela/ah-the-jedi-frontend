import UpdateArticleReducer from '../src/redux/reducers/UpdateArticleReducer';
import { UPDATE_ARTICLE, GET_ONE_ARTICLE } from '../src/redux/constants';

describe.only('unit tests for update article reducer', () => {
  const initialState = {
    isLoading: false,
    message: {},
    error: {},
  };

  it('changes isLoading to true', () => {
    const action = {
      type: UPDATE_ARTICLE,
    };
    const newState = UpdateArticleReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      isLoading: true,
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets success message', () => {
    const action = {
      type: `${UPDATE_ARTICLE}_SUCCESS`,
      response: 'successful',
    };
    const newState = UpdateArticleReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      message: 'successful',
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets error response', () => {
    const action = {
      type: `${UPDATE_ARTICLE}_FAILURE`,
      error: { response: { data: 'failure' } },
    };
    const newState = UpdateArticleReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      error: 'failure',
    };
    expect(newState).toEqual(excpectedState);
  });

  it('changes isLoading to true', () => {
    const action = {
      type: GET_ONE_ARTICLE,
    };
    const newState = UpdateArticleReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      isLoading: true,
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets success message', () => {
    const action = {
      type: `${GET_ONE_ARTICLE}_SUCCESS`,
      response: 'successful',
    };
    const newState = UpdateArticleReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      message: 'successful',
    };
    expect(newState).toEqual(excpectedState);
  });

  it('it sets error response', () => {
    const action = {
      type: `${GET_ONE_ARTICLE}_FAILURE`,
      error: { response: { data: 'failure' } },
    };
    const newState = UpdateArticleReducer(initialState, action);
    const excpectedState = {
      ...initialState,
      error: 'failure',
    };
    expect(newState).toEqual(excpectedState);
  });
});
