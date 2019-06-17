import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import SearchArticleByTag from '../src/components/articles/SearchArticleByTag';
import SearchTagEmpty from '../src/components/articles/SearchTagEmpty';

describe('test renders search component', () => {
  let wrapper;

  it('should render search by tag component with Articles, Tags and Authors', () => {
    const props = {
      searchedTags: jest.fn(),

      values: [
        {
          slug: 'lorem',
          title: 'lorem',
          description: 'lorem',
          updated_at: 'lorem',
          readtime: 'lorem',
          image: 'lorem',
          url: 'lorem',
          author: 'lorem',
          body: 'lorem',
        },
      ],
    };
    wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <SearchArticleByTag {...props} />
        </Provider>
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toEqual(true);
  });

  it('renders search tag empty component', () => {
    const props = {
      errorMessage: 'We could not find what you are looking for.',
    };
    wrapper = shallow(<SearchTagEmpty {...props} />);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.exists()).toEqual(true);
  });
});
