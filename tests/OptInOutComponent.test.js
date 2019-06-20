import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import OptInOutView from '../src/views/OptInOutView';

describe('should mount OptInOutView component when it is called', () => {
  it('tests for successful mount of pagination', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <OptInOutView />
        </Provider>
      </BrowserRouter>,
    );
  });
});
