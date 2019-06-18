import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import FollowingList from '../src/components/follows/FollowingList';

describe('should mount FollowingList', () => {
  it('tests for successful mount of FollowingList view with functions', () => {
    const props = {
      getFollowing: jest.fn(),
      followersReducer: jest.fn(),
      username: 'testUser',
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <FollowingList {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const followingDiv = wrapper.find('#following').first();

    expect(followingDiv.exists()).toBe(true);
  });
});
