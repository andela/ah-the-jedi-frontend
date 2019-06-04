import React from 'react';
import { mount } from 'enzyme';
import Home from '../src/components/home/Home';
import store from '../src/redux/store/';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('unit tests Home View', () => {
  it('Should render component without errors', () => {
    mount(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>,
    );
  });
});
