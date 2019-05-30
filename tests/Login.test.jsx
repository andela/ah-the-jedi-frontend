import React from 'react';
import moxios from 'moxios';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store/';
import LoginReducer from '../src/redux/reducers/loginReducer';
import { loginSuccess, loginFailure, logout } from '../src/redux/actions/loginActions';
import LoginView from '../src/views/LoginView';

/*
 *This function mounts the
 *component to test
 */
const setUp = (props = {}) => {
  const component = mount(
    <BrowserRouter>
      <Provider store={store}>
        <LoginView {...props} />
      </Provider>
    </BrowserRouter>,
  );
  return component;
};

/*
 *This function finds a component
 *by its data-set attribute
 */
const findByAttribute = (component, attr) => {
  const wrapper = component.find(`[data-set='${attr}']`);
  return wrapper;
};

describe('Unit tests for LoginView component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render the loginTestDiv', () => {
    const wrapper = findByAttribute(component, 'loginTestDiv');
    expect(wrapper.exists()).toBe(true);
  });
  it('Should render the formTestDiv', () => {
    const wrapper = findByAttribute(component, 'formTestDiv');
    expect(wrapper.exists()).toBe(true);
  });
});

describe('Unit test for form submission', () => {
  const props = {
    loginUser: jest.fn(),
  };
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <LoginView {...props} />
      </Provider>
    </BrowserRouter>,
  );
  const email = wrapper.find('#email').first();
  const password = wrapper.find('#password').first();

  email.simulate('change', {
    target: {
      type: 'email',
      value: 'test@test.com',
    },
  });
  password.simulate('change', {
    target: {
      type: 'password',
      value: 'TechAt254',
    },
  });
  wrapper.find('form').simulate('submit', {
    preventDefault: () => {},
    target: [{ value: '' }],
  });
  expect(password.exists()).toBe(true);
  expect(email.exists()).toBe(true);
});

describe('tests login reducer', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('Tests for success action dispatch', async done => {
    moxios.stubRequest('/login');
    const response = {
      user: {
        email: 'test@gmail.com',
        username: 'benkim',
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImJlbmtpbWVyaWNAZ21haWwuY29tIiwiZXhwIjoxNTU5NjMxMTY5LCJlbWFpbCI6ImJlbmtpbWVyaWNAZ21haWwuY29tIn0.Y0Y_jajuA-Y194E8TZvUOoR4si1ttzMdy1s2qg05MOU',
      },
      status: 200,
    };
    await store.dispatch(loginSuccess(response));
    expect(store.getState().LoginReducer.isAuthenticated).toEqual(true);
    done();
  });

  it('Tests for failure action dispatch', async done => {
    moxios.stubRequest('/login');
    const response = {
      errors: {
        error: ['A user with this email and password was not found.'],
      },
      status: 400,
    };
    await store.dispatch(loginFailure(response));
    expect(store.getState().LoginReducer.isAuthenticated).toEqual(false);
    done();
  });

  it('Tests for logout action dispatch', async done => {
    moxios.stubRequest('/login');

    await store.dispatch(logout());
    expect(store.getState().LoginReducer.isAuthenticated).toEqual(false);
    done();
  });
});

describe('Test login reducer', () => {
  it('Should return default login state', () => {
    const newState = LoginReducer(undefined, {});
    expect(newState.data).toEqual({});
    expect(newState.isAuthenticated).toEqual(false);
  });
});

describe('changes state', () => {
  const expectedState = { email: 'test@test.com', password: 'TechAt254' };
  const newWrapper = shallow(
    <BrowserRouter>
      <Provider store={store}>
        <LoginView />
      </Provider>
    </BrowserRouter>,
  );
  newWrapper.setState({ email: 'test@test.com', password: 'TechAt254' });
  newWrapper.update();
  it('should update the state', () => {
    expect(newWrapper.state()).toEqual(expectedState);
  });
});
