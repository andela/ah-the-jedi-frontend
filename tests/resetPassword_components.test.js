import React from 'react';
import { shallow } from 'enzyme';
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
