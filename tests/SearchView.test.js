import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import SearchView from '../src/views/SearchView';

describe('should mount search view', () => {
  it('tests for successful mount of search view with functions', () => {
    const props = {
      search: jest.fn(),
    };
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <SearchView {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const search = wrapper.find('#search').first();

    search.simulate('change', {
      target: {
        type: 'text',
        value: 'lorem',
      },
    });

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: [{ value: '' }],
    });

    wrapper
      .find('#search-tags')
      .first()
      .simulate('click', {
        preventDefault: () => {},
      });

    wrapper
      .find('#search-authors')
      .first()
      .simulate('click', {
        preventDefault: () => {},
      });

    wrapper
      .find('#search-title')
      .first()
      .simulate('click', {
        preventDefault: () => {},
      });

    expect(search.exists()).toBe(true);
  });
});
