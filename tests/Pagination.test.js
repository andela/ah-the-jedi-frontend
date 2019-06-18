import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import Pagination from '../src/components/articles/Pagination';

describe('should mount Pagination component when it is called', () => {
  it('tests for successful mount of pagination', () => {
    const props = {
      handleLink: jest.fn(),
      handleClick: jest.fn(),
      pageNumbers: [],
      next: '',
      previous: '',
      currentPage: 1,
    };
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination {...props} />
        </Provider>
      </BrowserRouter>,
    );
  });

  it('renders Pagination component', () => {
    const props = {
      handleLink: jest.fn(),
      handleClick: jest.fn(),
      pageNumbers: [],
      next: '',
      previous: 'a',
      currentPage: 1,
    };
    const event = {
      preventDefault() {},
      target: { value: 'the-value' },
    };
    const wrapper = shallow(<Pagination {...props} />);

    wrapper.find('.page-link').simulate('click', event);
    expect(props.handleLink).toHaveBeenCalled();
  });
});
