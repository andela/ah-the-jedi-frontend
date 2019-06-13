import React from 'react';
import { mount } from 'enzyme/build';
import expect from 'expect';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import UpdateArticleView from '../src/views/UpdateArticleView';
import image_uploader from '../src/helpers/image_uploader';
import store from '../src/redux/store';


describe('CreateArticlesPage page test', () => {
  const state = {
    title: 'title',
    description: 'asdasd',
    body: 'sdrgadfgsdg',
    tagList: 'sdfgsdfg',
    imageIsLoading: false,
    isloading: false,
  };

  const props = {
    onChange: jest.fn(),
    state,
    onEditorStateChange: jest.fn(),
    onSubmit: jest.fn(),
    isLoading: state.isloading,
    uploadImageCallBack: jest.fn(),
    image: '',
    onImageClick: jest.fn(),
    imageIsLoading: state.imageIsLoading,
    title: state.title,
    body: state.body,
    description: state.description,
    tagList: state.tagList,
  };

  const wrapper = mount(
    <BrowserRouter>
      <Provider store={store}>
        <UpdateArticleView {...props} />
      </Provider>
    </BrowserRouter>,
  );

  it('should upload image', () => {
    image_uploader('../src/assets/test.png');
  });

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

    wrapper.find('#editor').first().simulate('change', {
      target: {
        type: 'text',
        value: 'test',
      },
    });

    wrapper.update();

    wrapper.find('#form').first().simulate('submit', {
      preventDefault: () => { },
      target: [{ value: '' }],
    });
  });
});
