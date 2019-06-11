import React from 'react';
import { mount } from 'enzyme/build';
import expect from 'expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CreateArticleView from '../src/views/CreateArticleView';
import store from '../src/redux/store';


describe('CreateArticlesPage page test', () => {
  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <CreateArticleView />
      </Provider>
    </BrowserRouter>,
  );

  it('Should render component without errors', () => {
    const editor = wrapper.find('#editor').first();
    expect(editor.exists()).toBe(true);

    const title = wrapper.find('#title').first();
    expect(title.exists()).toBe(true);
    title.simulate('change', {
      target: {
        type: 'text',
        value: 'test',
      },
    });

    wrapper.update();

    const description = wrapper.find('#description').first();
    expect(description.exists()).toBe(true);
    description.simulate('change', {
      target: {
        type: 'text',
        value: 'test',
      },
    });

    wrapper.update();

    const tags = wrapper.find('#tagList').first();
    expect(tags.exists()).toBe(true);
    tags.simulate('change', {
      target: {
        type: 'text',
        value: 'tag, tag1',
      },
    });

    wrapper.update();

    const img_btn = wrapper.find('#img_btn').first();
    expect(tags.exists()).toBe(true);
    img_btn.simulate('change', {
      files: [
        '../src/assets/styles/app.scss',
      ],
    });

    wrapper.find('#form').first().simulate('submit', {
      preventDefault: () => { },
      target: [{ value: '' }],
    });
  });
});
