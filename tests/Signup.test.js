import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from '../src/components/auth/Signup';

describe('unit tests for sign up componenet', () => {
  const props = {
    signUpUser: jest.fn(),
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    error: {},
  };
  const event = {
    preventDefault() {},
    target: { value: 'the-value' },
  };

  it('renders signup form component without crashing', () => {
    const wrapper = shallow(<SignupForm {...props} />);
    wrapper.find('#email').simulate('change', event);
    expect(props.onChange).toHaveBeenCalled();
  });
  it('displays error on error', () => {
    const newProps = {
      ...props,
      error: {
        errors: {
          email: ['This is an error'],
          password: ['This is a password error'],
          username: ['This is a username password'],
        },
      },
    };
    const newWrapper = shallow(<SignupForm {...newProps} />);
    expect(newWrapper.find('#username-error').props().children).toEqual(
      'This is a username password',
    );
  });
  it('displays appropriate component after loading', () => {
    const newProps = { ...props, isLoading: true };
    const newWrapper = shallow(<SignupForm {...newProps} />);
    expect(newWrapper.find('#spinner-loading')).toHaveLength(1);
  });
});
