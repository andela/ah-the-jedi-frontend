import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import configureMockStore from 'redux-mock-store';
import store from '../src/redux/store';
import SocialLogin from '../src/components/auth/Social';

/*
 *This function mounts the
 *component to test
 */
const setUp = (props = {}) => {
  const component = mount(
    <BrowserRouter>
      <Provider store={store}>
        <SocialLogin {...props} />
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

const mockStore = configureMockStore();
const store1 = mockStore({});

describe('Unit tests for SocialLogin component', () => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);

  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render the SocialLoginDiv', () => {
    const wrapper = findByAttribute(component, 'SocialLoginDiv');
    expect(wrapper.exists()).toBe(true);
  });
});

describe('component changes state', () => {
  const expectedState = { isClicked: true };
  const newWrapper = shallow(
    <BrowserRouter>
      <Provider store={store}>
        <SocialLogin />
      </Provider>
    </BrowserRouter>,
  );
  newWrapper.setState({ isClicked: true });
  newWrapper.update();

  it('should update the state', () => {
    expect(newWrapper.state()).toEqual(expectedState);
  });
});

describe('unit tests for clicking social buttons', () => {
  const mockComponentClickedFn = jest.fn();
  const onClickMock = jest.fn(() => {
    mockComponentClickedFn();
  });

  const props = {
    UserSocialLogin: jest.fn(),
  };

  const wrapper = shallow(
    <BrowserRouter>
      <Provider store={store1}>
        <SocialLogin store={store1}>
          <FacebookLogin onClick={onClickMock} />
        </SocialLogin>
      </Provider>
    </BrowserRouter>,
  );

  const wrapmount = mount(
    <BrowserRouter>
      <Provider store={store1}>
        <SocialLogin store={store1} {...props} />
      </Provider>
    </BrowserRouter>,
  );

  const tree = wrapper
    .find(SocialLogin)
    .shallow()
    .find(FacebookLogin)
    .shallow();

  it('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should call method', () => {
    const component = shallow(<FacebookLogin />);
    expect(component.exists()).toEqual(true);
    console.log(tree.props());
    tree.simulate('click');
    expect(mockComponentClickedFn).toBeCalled();
  });

  it('test james', () => {
    const facebookbutton = wrapmount.find('button[id="facebookLogin"]');
    const googlebutton = wrapmount.find('button[id="googleLogin"]');
    facebookbutton.simulate('click');
    googlebutton.simulate('click');
    expect(googlebutton.length).toEqual(1);
    expect(facebookbutton.length).toEqual(1);
  });
});
