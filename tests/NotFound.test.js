import React from 'react';
import { mount } from 'enzyme';
import Notfound from '../src/components/layout/Notfound';
import store from '../src/redux/store/';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('unit test for Notfound View', () => {
  it('Should render component without errors', () => {
    mount(
      <BrowserRouter>
        <Provider store={store}>
          <Notfound />
        </Provider>
      </BrowserRouter>,
    );
  });
});
