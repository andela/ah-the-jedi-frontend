import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { UserArticles } from '../src/components/articles/UserArticles';

describe('should mount userArticles when loading', () => {
  it('tests for successful mount of user articles while loading', () => {
    const props = {
      fetchOneArticle: jest.fn(),
      deleteArticle: jest.fn(),
      fetchByAuthor: jest.fn(),
      handleClick: jest.fn(),
      authorArticles: {
        isLoading: true,
      },
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
          <UserArticles {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const viewDiv = wrapper.find('#no-user-articles').first();

    expect(viewDiv.exists()).toBe(true);
  });
});

describe('should mount UserArticl component when data is available', () => {
  it('tests for successful mount of user articles', () => {
    const props = {
      fetchByAuthor: jest.fn(),
      authorArticles: {
        authorArticles: {
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
          <UserArticles {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const viewDiv = wrapper.find('#user-articles-test').first();

    expect(viewDiv.exists()).toBe(true);
  });
});
