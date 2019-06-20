import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Form } from 'react-bootstrap';
import store from '../src/redux/store';
import UserReports from '../src/components/profiles/UserReports';
import ModalPopUp from '../src/helpers/Modal';

describe('should mount user reports when loading', () => {
  const props = {
    fetchReport: jest.fn(),
    deleteReport: jest.fn(),
    updateReport: jest.fn(),
    handleClickSaveId: jest.fn(),
    handleUpdate: jest.fn(),
    reports: {
      isLoading: true,
    },
    id: 55,
    reporter: {
      id: 2,
      username: 'benkim',
      email: 'benkimeric@gmail.com',
    },
    reported_article: {
      id: 116,
      slug: 'subrau-crosstrek-3',
      title: 'Subrau Crosstrek',
      description: 'All new Subaru Crosstrek',
      author: {
        id: 65,
        email: 'elisha.misoi@andela.com',
        username: 'elisha.misoi@andela.com',
      },
    },
    reason: 'plag',
    created_at: '2019-06-19T10:23:22.501232Z',
    updated_at: '2019-06-19T10:23:22.501280Z',
    match: { params: { username: 'testUser' } },
    handleClose: jest.fn(),
    handleShow: jest.fn(),
    button: '',
    body:
  <Form>
    <Form.Group>
      <Form.Control
        as="textarea"
        rows="3"
        className="reason"
        id="reason"
      />
    </Form.Group>
    <Form.Text className="text-muted" id="report-error" />
  </Form>,

    article: 'title',
    slug: 'slug',
    description: 'Reason for Reporting',
    updateddAt: 'June 19 19',
    btnType: 'outline-primary',
    trigger: 'view',
    state: {
      id: 32,
      reason: 'dsasdasda',
    },
  };

  it('tests for successful mount of user articles while loading', () => {

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <UserReports {...props} />
        </Provider>
      </BrowserRouter>,
    );
    const viewDiv = wrapper.find('#no-user-reports').first();

    expect(viewDiv.exists()).toBe(true);
  });

  it('tests for successful mount of user articles with modal while loading', () => {

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <UserReports {...props} />
          <ModalPopUp {...props} />
        </Provider>
      </BrowserRouter>,
    );
    wrapper.find('ModalPopUp').prop('handleUpdate')(props.state.id);
    expect(props.handleUpdate).toHaveBeenCalledTimes(1);
  });
});
