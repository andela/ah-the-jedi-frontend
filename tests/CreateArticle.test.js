import React from 'react';
import { shallow } from 'enzyme';
import CreateArticle from '../src/components/articles/CreateArticle';

describe('unit tests for createArticle componenet', () => {
  const props = {
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    onEditorStateChange: jest.fn(),
    uploadImageCallBack: jest.fn(),
    onImageClick: jest.fn(),
  };
  const event = {
    preventDefault() { },
    target: { value: 'the-value' },
  };

  it('renders createArticle component without crashing', () => {
    const wrapper = shallow(<CreateArticle {...props} />);
    wrapper.find('#title').simulate('change', event);
    expect(props.onChange).toHaveBeenCalled();
  });
  it('displays appropriate component after loading', () => {
    const newProps = { ...props, isLoading: true };
    const newWrapper = shallow(<CreateArticle {...newProps} />);
    expect(newWrapper.find('#spinner-loading')).toHaveLength(1);
  });
});
