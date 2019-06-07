import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { BASE_URL } from '../src/redux/constants';
import { fetchSuccess, fetchFail } from '../src/redux/actions/profileActions';

describe('Test profile actions', () => {
  let testStore = configureMockStore([thunk]);
  let store = testStore({});

  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const profile = {
    first_name: 'Lee',
    last_name: 'Mwangi',
    username: 'Leewel',
    email: 'thismyr2@gmail.com',
    bio: 'I love silver opera',
    image: 'https://res.cloudinary.com/do8v0ew77/image/upload/v1559832986/20190606145625.png',
    created_at: '2019-05-16 11:51:11',
    updated_at: '2019-06-06 15:21:33',
    following: 'True',
  };

  it('test successful fetch profile actions', async done => {
    moxios.stubRequest(`${BASE_URL}/profiles/Leewel`, {
      status: 200,
      response: {
        profile,
      },
    });

    await store.dispatch(fetchSuccess());
    expect(store.getActions()[0].type).toEqual('FETCH_PROFILE_SUCCESS');
    done();
  });

  it('test fetch profile actions with errors', async done => {
    moxios.stubRequest(`${BASE_URL}/profiles/Leewel`, {
      status: 404,
      response: {
        errors: 'profile with this username does not exist',
        status: '404',
      },
    });

    await store.dispatch(fetchFail());
    expect(store.getActions()[0].type).toEqual('FETCH_PROFILE_FAILURE');
    done();
  });

  it('test successful edit profile actions', async done => {
    moxios.stubRequest(`${BASE_URL}/profiles/Leewel/`, {
      status: 200,
      response: {
        profile,
      },
    });

    await store.dispatch(fetchSuccess());
    expect(store.getActions()[0].type).toEqual('FETCH_PROFILE_SUCCESS');
    done();
  });

  it('test edit profile actions with errors', async done => {
    moxios.stubRequest(`${BASE_URL}/profiles/Leewel/`, {
      status: 404,
      response: {
        errors: 'profile with this username does not exist',
        status: '404',
      },
    });

    await store.dispatch(fetchFail());
    expect(store.getActions()[0].type).toEqual('FETCH_PROFILE_FAILURE');
    done();
  });
});
