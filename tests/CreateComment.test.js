import React from 'react';
import { shallow } from 'enzyme';
import CreateComment from '../src/components/comments/createComment';
import Comments from '../src/components/comments/Comments';

describe('unit tests for createComment componenet', () => {
  const props = {
    onSubmit: jest.fn(),
    onChange: jest.fn(),
    onEditorStateChange: jest.fn(),
    uploadImageCallBack: jest.fn(),
    onImageClick: jest.fn(),
  };
  const event = {
    preventDefault() {},
    target: { value: 'the-value' },
  };

  it('renders createArticle component without crashing', () => {
    const wrapper = shallow(<CreateComment {...props} />);
    wrapper.find('.form-control').simulate('change', event);
    expect(props.onChange).toHaveBeenCalled();
  });
});
