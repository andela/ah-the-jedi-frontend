import React from 'react';
import { mount } from 'enzyme';
import Header from '../src/components/layout/Header';
import store from '../src/redux/store/';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('unit tests Header View', () => {
  it('Should render component without errors', () => {
    mount(
      <BrowserRouter>
        <Provider store={store}>
          <Header />
        </Provider>
      </BrowserRouter>,
    );
  });
});
