import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import ReadArticle from '../src/components/articles/ReadArticle';
import OneArticle from '../src/components/articles/OneArticle';
import { UserArticles } from '../src/components/articles/UserArticles';
import Article from '../src/components/articles/Article';

describe('should mount ReadArticle and OneArticle', () => {
  it('tests for successful mount of ReadArticle and OneArticle view with functions', () => {
    const props = {
      fetchOneArticle: jest.fn(),
      deleteArticle: jest.fn(),
      fetchByAuthor: jest.fn(),
      handleClick: jest.fn(),
      authorArticles: {
        isLoading: false,
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
      tags: ['tets', 'here'],
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ReadArticle {...props} />
          <OneArticle {...props} />
          <UserArticles {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const viewDiv = wrapper.find('#view-article').first();

    expect(viewDiv.exists()).toBe(true);
  });

  it('tests for successful mount of article component', () => {
    const props = {
      fetchOneArticle: jest.fn(),
      deleteArticle: jest.fn(),
      fetchByAuthor: jest.fn(),
      handleClick: jest.fn(),
      authorArticles: {
        isLoading: false,
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
      tags: ['tets', 'here'],
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ReadArticle {...props} />
          <OneArticle {...props} />
          <Article {...props} />
        </Provider>
      </BrowserRouter>,
    );
  });
});

describe('should mount ReadArticle component when data is loading', () => {
  it('tests for successful loader mount of ReadArticle articles', () => {
    const props = {
      fetchByAuthor: jest.fn(),
      isTokenExpired: jest.fn(),
      deleteArticle: jest.fn(),
      article: {
        isLoading: false,
        article: {
          data: {
            data: {
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
          },
        },
      },
      match: { params: { slug: 'test-slug' } },
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ReadArticle {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const testDiv = wrapper.find('#loading-span-test').first();

    expect(testDiv.exists()).toBe(true);
  });
});
