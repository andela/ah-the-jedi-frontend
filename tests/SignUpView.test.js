import React from 'react';
import { mount, shallow } from 'enzyme';
import SignUpView from '../src/views/SignUpView';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store/';

describe('unit tests for sign up view', () => {
  const props = {
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    handleConfirmPassword: jest.fn(),
    error: {},
  };
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <SignUpView {...props} />
      </Provider>
    </BrowserRouter>,
  );
  it('Should render component without errors', () => {
    const confirm = wrapper.find('#match').first();
    expect(confirm.exists()).toBe(true);
    const email = wrapper.find('#email').first();
    expect(email.exists()).toBe(true);
    email.simulate('change', {
      target: {
        type: 'email',
        value: 'test@test.com',
      },
    });
    const username = wrapper.find('#username').first();
    expect(username.exists()).toBe(true);
    username.simulate('change', {
      target: {
        type: '',
        value: 'test_user',
      },
    });
    const password = wrapper.find('#password').first();
    expect(password.exists()).toBe(true);
    password.simulate('change', {
      target: {
        name: 'password',
        value: 'test1211',
      },
    });
    console.log(password.value);
    wrapper.find('#form').simulate('submit', {
      preventDefault: () => {},
      target: [{ value: '' }],
    });
    wrapper.update();
  });
});
