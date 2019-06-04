import React from 'react';
import { mount } from 'enzyme';
import EmailSentView from '../src/views/EmailSentView';
import store from '../src/redux/store/';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

describe('unit tests EmailSentView View', () => {
  it('Should render component without errors', () => {
    mount(
      <BrowserRouter>
        <Provider store={store}>
          <EmailSentView />
        </Provider>
      </BrowserRouter>,
    );
  });
});
