import React from 'react';
import { shallow } from 'enzyme';
import ArticlesSearch from '../src/components/articles/ArticlesSearch';
import AuthorsSearch from '../src/components/articles/AuthorsSearch';
import TagsSearch from '../src/components/articles/TagsSearch';
import SearchEmpty from '../src/components/articles/SearchEmpty';
import SearchComponent from '../src/components/articles/SearchComponent';

describe('test renders search component', () => {
  let wrapper;

  it('should render search component with Articles, Tags and Authors', () => {
    const props = {
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      errorMessage: 'We could not find what you are looking for.',
      onClickArticles: jest.fn(),
      onClickAuthors: jest.fn(),
      onClickTags: jest.fn(),
      searchState: {
        search: 'test',
      },
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
    wrapper = shallow(<SearchComponent {...props} />);
    const articles = wrapper.find('ArticlesSearch');
    const tags = wrapper.find('TagsSearch');
    const authors = wrapper.find('AuthorsSearch');
    expect(articles).toHaveLength(1);
    expect(tags).toHaveLength(1);
    expect(authors).toHaveLength(1);
  });

  it('renders articles search component with link to an article', () => {
    const props = {
      value: {
        slug: 'lorem',
        title: 'lorem',
        description: 'lorem',
        updated_at: 'lorem',
        readtime: 'lorem',
        image: 'lorem',
        url: 'lorem',
        author: 'lorem',
        body: 'lorem',
        id: 9,
      },
    };
    wrapper = shallow(<ArticlesSearch {...props} key={props.value.id} />);
    expect(wrapper.find('Card')).toHaveLength(1);
  });

  it('renders authors search component', () => {
    const props = { author: 'cate' };
    wrapper = shallow(<AuthorsSearch {...props} />);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.exists()).toEqual(true);
  });

  it('renders tags search component', () => {
    const props = {
      tag: 'test',
    };
    wrapper = shallow(<TagsSearch {...props} />);
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.exists()).toEqual(true);
  });

  it('renders search empty component', () => {
    const props = {
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      errorMessage: 'We could not find what you are looking for.',
      onClickArticles: jest.fn(),
      onClickAuthors: jest.fn(),
      onClickTags: jest.fn(),
      searchState: {
        search: 'test',
      },
    };
    wrapper = shallow(<SearchEmpty {...props} />);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.exists()).toEqual(true);
  });
});
