import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import FollowersList from '../src/components/follows/FollowersList';

describe('should mount FollowerList', () => {
  it('tests for successful mount of FollowerList view with functions', () => {
    const props = {
      getFollowers: jest.fn(),
      followersReducer: jest.fn(),
      username: 'testUser',
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <FollowersList {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const followersDiv = wrapper.find('#followers').first();

    expect(followersDiv.exists()).toBe(true);
  });
});
