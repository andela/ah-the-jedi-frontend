import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { ResetPasswordView } from '../src/views/ResetPasswordView';
import { ResetPasswordForm } from '../src/components/auth/ResetPasswordForm';
import { PasswordConfirmView } from '../src/views/PasswordConfirmView';
import { PasswordConfirmForm } from '../src/components/auth/PasswordConfirmForm';


describe('test renders reset password forms', () => {
  let wrapper;

  test('renders reset password form', () => {
    wrapper = shallow(<ResetPasswordForm />);
    expect(wrapper.exists()).toEqual(true);
  });

  test('renders password confirm form', () => {
    wrapper = shallow(<PasswordConfirmForm />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('successful render of reset password view', () => {
    wrapper = shallow(<ResetPasswordView />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('successful render of confirm password view', () => {
    wrapper = shallow(<PasswordConfirmView />);
    expect(wrapper.exists()).toEqual(true);
  });
});

describe('test reset password form submission', () => {
  const props = {
    mockResetPasswordFn: jest.fn(),
  };
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <ResetPasswordView {...props} />
      </Provider>
    </BrowserRouter>,
  );
  const email = wrapper.find('#email').first();

  email.simulate('change', {
    target: {
      type: 'email',
      value: 'test@test.com',
    },
  });

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
    target: [{ value: '' }],
  });
  expect(email.exists()).toBe(true);
});

describe('Unit test for form submission', () => {
  const props = {
    mockPasswordConfirmFn: jest.fn(),
  };
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <PasswordConfirmView {...props} />
      </Provider>
    </BrowserRouter>,
  );
  const password = wrapper.find('#password').first();
  const confirmPassword = wrapper.find('#myDiv').first();

  password.simulate('change', {
    target: {
      type: 'password',
      value: '12345678',
    },
  });

  confirmPassword.simulate('change', {
    target: {
      type: 'password',
      value: '12345678',
    },
  });

  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
    target: [{ value: '' }],
  });
  expect(password.exists()).toBe(true);
  expect(confirmPassword.exists()).toBe(true);
});
