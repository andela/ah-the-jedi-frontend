import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import FollowButton from '../src/components/follows/FollowButton';

describe('should mount FollowerButton', () => {
  it('tests for successful mount of FollowerButton with functions', () => {
    const props = {
      followReducer: jest.fn(),
      isProfileOwner: 'True',
      userFollow: jest.fn(),
      userUnFollow: jest.fn(),
      username: 'testUser',
      isOwner: 'Following',
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <FollowButton {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const followbtnDiv = wrapper.find('#followbtn').first();

    expect(followbtnDiv.exists()).toBe(true);
  });

  it('should call method', () => {
    const props = {
      followReducer: jest.fn(),
      isProfileOwner: 'True',
      userFollow: jest.fn(),
      userUnFollow: jest.fn(),
      username: 'testUser',
      isOwner: 'Following',
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <FollowButton {...props} />
        </Provider>
      </BrowserRouter>,
    );

    const btn = wrapper.find('#btntest').first();
    expect(btn.exists()).toBe(true);
    btn.simulate('click');
  });
});
