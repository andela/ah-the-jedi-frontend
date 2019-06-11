import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store/';
import ProfileView from '../src/components/profiles/Profile';

/*
 *This function mounts the
 *component to test
 */
const setUp = (props = {}) => {
  const component = mount(
    <Router>
      <Provider store={store}>
        <ProfileView {...props} />
      </Provider>
    </Router>,
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

describe('Tests for Profile Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('renders profile without errors ', () => {
    let profileContainer = findByAttribute(component, 'profileTestDiv');
  });
});
