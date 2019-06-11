import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Comments from '../src/components/comments/Comments';
import CreateComment from '../src/components/comments/createComment';
import ThreadComment from '../src/components/comments/threadComment';
import CreateCommentView from '../src/views/CreateCommentView';
import CreateThreadedCommentView from '../src/views/CreateThreadedCommentView';

describe('should mount AllComments component when data is available', () => {
  it('tests for successful mount of article comments', () => {
    const props = {
      fetchCommentsAction: jest.fn(),
      data: {
        Comments: [
          {
            id: 76,
            comment: 'Haaaaaaaaa',
            children: [],
            submit_date: '2019-06-11T10:09:47.895516Z',
            author: {
              id: 10,
              email: 'alvomugz@gmail.com',
              username: 'Alv0',
            },
            votes: 0,
            num_vote_down: 0,
            num_vote_up: 0,
          },
        ],
      },
      match: { params: { username: 'testUser' } },
    };

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Comments {...props} />
        </Provider>
      </BrowserRouter>,
    );
  });
});

describe('should mount createComment component when it is called', () => {
  it('tests for successful mount of createComment', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <CreateComment />
        </Provider>
      </BrowserRouter>,
    );
  });
});

describe('should mount createthreadComment component when it is called', () => {
  it('tests for successful mount of threadComment', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ThreadComment />
        </Provider>
      </BrowserRouter>,
    );
  });
});

describe('should mount CreateCommentView component when it is called', () => {
  it('tests for successful mount of CreateCommentView', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <CreateCommentView />
        </Provider>
      </BrowserRouter>,
    );
  });
});

describe('should mount CreateThreadedCommentView component when it is called', () => {
  it('tests for successful mount of CreateThreadedCommentView', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <CreateThreadedCommentView />
        </Provider>
      </BrowserRouter>,
    );
  });
});
