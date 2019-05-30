import React from 'react';
import { mount, shallow } from 'enzyme';
import AccountActivateView from '../src/views/AccountActivateView';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store/';

describe('unit tests AccountActivate View', () => {
  it('Should render component without errors', () => {
    mount(
      <BrowserRouter>
        <Provider store={store}>
          <AccountActivateView />
        </Provider>
      </BrowserRouter>,
    );
  });
});
