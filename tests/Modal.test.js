import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ModalPopUp from '../src/helpers/Modal';
import store from '../src/redux/store';

describe('should mount ReadArticle and OneArticle', () => {
  const props = {
    handleClose: jest.fn(),
    handleShow: jest.fn(),
    button: '',
    body: 'plagiarised',
    article: 'title',
    slug: 'slug',
    description: 'Reason for Reporting',
    updateddAt: 'June 19 19',
    btnType: 'outline-primary',
    trigger: 'view',
  };

  it('tests for successful mount of modal component', () => {

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ModalPopUp {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const viewDiv = wrapper.find('#modal-popup').first();

    expect(viewDiv.exists()).toBe(true);
  });

  const event = {
    preventDefault() {},
  };

  it('tests for handleShowclick functions in modal', () => {

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ModalPopUp {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const showBtn = wrapper.find('#modal-show-btn').first();

    showBtn.simulate('click', event);

    expect(showBtn.exists()).toBe(true);
  });
});
