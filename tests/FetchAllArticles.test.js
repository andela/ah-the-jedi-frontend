import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import AllArticles from '../src/views/AllArticles';
import Article from '../src/components/articles/Article';

describe('should mount AllArticles component when data is available', () => {
  it('tests for successful mount of user articles', () => {
    const props = {
      fetchByAuthor: jest.fn(),
      articles: {
        articles: {
          data: {
            results: [
              {
                title: 'test title',
                description: 'sample description',
                readtime: '1 min',
                created_at: '2019-06-11T07:10:29.083227Z',
                author: 'testUser',
                image:
                  'http://res.cloudinary.com/do8v0ew77/image/upload/v1560173897/u0hmclwxyhb0fowtxbls.jpg',
                slug: 'test-slug',
                body: 'imaginative long body ',
              },
            ],
          },
        },
      },
      match: { params: { username: 'testUser' } },
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <AllArticles {...props} />
        </Provider>
      </BrowserRouter>,
    );
  });
});

describe('should mount AllArticles and Article components', () => {
  it('tests for successful mount of article component', () => {
    const props = {
      title: 'test title',
      description: 'sample description',
      readtime: '1 min',
      created_at: '2019-06-11T07:10:29.083227Z',
      author: 'testUser',
      image:
        'http://res.cloudinary.com/do8v0ew77/image/upload/v1560173897/u0hmclwxyhb0fowtxbls.jpg',
      slug: 'test-slug',
      body: 'imaginative long body ',
      match: { params: { username: 'testUser' } },
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Article {...props} />
        </Provider>
      </BrowserRouter>,
    );
  });
});
