import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Header from '../src/components/layout/Header';
import LoggedInLinks from '../src/components/layout/LoggedInLinks';
import LoggedOutLinks from '../src/components/layout/LoggedOutLinks';

const setUp = (props = {}) => {
  const component = mount(
    <BrowserRouter>
      <Provider store={store}>
        <Header {...props} />
        <LoggedInLinks {...props} />
        <LoggedOutLinks {...props} />
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

describe('Unit tests for Header Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it('Should render the nav-bar-test', () => {
    const wrapper = findByAttribute(component, 'nav-bar-test');
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render nav-bar-brand-test', () => {
    const wrapper = findByAttribute(component, 'nav-bar-brand-test');
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render nav-bar-logout-test', () => {
    const wrapper = findByAttribute(component, 'nav-bar-logout-test').first();
    expect(wrapper.exists()).toBe(true);

    wrapper.simulate('click');
  });
});
