import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordView } from '../src/views/ResetPasswordView';
import { ResetPasswordForm } from '../src/components/auth/ResetPasswordForm';
import { PasswordConfirmView } from '../src/views/PasswordConfirmView';
import { PasswordConfirmForm } from '../src/components/auth/PasswordConfirmForm';

describe('test renders reset password forms', () => {
  const props = {
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    handleConfirmPassword: jest.fn(),
    resetPassword: jest.fn(),
    passwordConfirm: jest.fn(),
    state: {
      password: '',
      confirmPassword: '',
      isError: false,
      isInvalid: true,
    },
  };
  let wrapper;

  test('renders reset password form', () => {
    wrapper = shallow(<ResetPasswordForm {...props} />);
    expect(wrapper.exists()).toEqual(true);
  });

  test('renders password confirm form', () => {
    wrapper = shallow(<PasswordConfirmForm {...props} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('successful render of reset password view', () => {
    wrapper = shallow(<ResetPasswordView {...props} />);
    expect(wrapper.exists()).toEqual(true);
  });

  it('successful render of confirm password view', () => {
    wrapper = shallow(<PasswordConfirmView {...props} />);
    expect(wrapper.exists()).toEqual(true);
  });
});
