import React from 'react';
import { shallow } from 'enzyme';
import { PasswordConfirmView } from '../src/views/PasswordConfirmView';
import { PasswordConfirmForm } from '../src/components/auth/PasswordConfirmForm';

/*
 * Defines the password confirm view tests.
 */
describe('test renders reset password forms', () => {
  const props = {
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    handleSubmit: jest.fn(),
    passwordConfirm: jest.fn(),
    handleConfirmPassword: jest.fn(),
  };
  const wrapper = shallow(<PasswordConfirmView {...props} />);
  const input = { target: { name: 'password', value: 'testpassword' } };
  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'password',
      value: '12345678',
    },
  };

  it('should change state value of password', () => {
    wrapper.find('PasswordConfirmForm').prop('onChange')(input);
    expect(wrapper.state('password')).toBe('testpassword');
  });

  it('should call onSubmit', () => {
    wrapper.instance().onSubmit(event);
    expect(props.passwordConfirm).toHaveBeenCalled();
  });

  it('renders reset password form', () => {
    const newWrapper = shallow(<PasswordConfirmForm {...props} />);
    expect(newWrapper.exists()).toEqual(true);
  });
});
