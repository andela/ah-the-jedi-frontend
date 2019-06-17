import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordView } from '../src/views/ResetPasswordView';
import { ResetPasswordForm } from '../src/components/auth/ResetPasswordForm';

/*
 * Defines the reset password view tests:
 */
describe('test renders reset password forms', () => {
  const props = {
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    resetPassword: jest.fn(),
  };
  const wrapper = shallow(<ResetPasswordView {...props} />);
  const input = { target: { name: 'email', value: 'test@gmail.com' } };

  it('should change state value of email', () => {
    wrapper.find('ResetPasswordForm').prop('onChange')(input);
    expect(wrapper.state('email')).toBe('test@gmail.com');
  });

  it('should call onSubmit', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().onSubmit(event);
    expect(props.resetPassword).toHaveBeenCalled();
  });

  it('renders reset password form', () => {
    const newWrapper = shallow(<ResetPasswordForm {...props} />);
    expect(newWrapper.exists()).toEqual(true);
  });
});
