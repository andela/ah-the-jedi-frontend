import React from 'react';
import { shallow } from 'enzyme';
import Login from '../src/components/auth/Login';

describe('Unit tests for login', () => {
  it('renders login page', () => {
      shallow(<Login />)
  })
})
