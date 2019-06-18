import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Follower from '../src/components/follows/Follower';

describe('should mount Follower', () => {
  it('tests for successful mount of Follower view with functions', () => {
    const props = {
      FetchUserprofile: jest.fn(),
      username: 'testUser',
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Follower {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const followerDiv = wrapper.find('#follower').first();

    expect(followerDiv.exists()).toBe(true);
  });
});
