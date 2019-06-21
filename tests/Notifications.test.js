import React from 'react';
import { shallow } from 'enzyme';

import { Notifications } from '../src/components/notifications/Notifications';

describe('Tests for Notification Component with field update', () => {
  it('Should fetch notifications successfully', () => {
    const props = {
      notifications: [
        {
          url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/profiles/testcate',
          message: 'testcate started following you.',
          created_at: '2019-06-21 06:06:56',
          id: 531,
          read: false,
        },
        {
          url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
          message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
          created_at: '2019-06-20 18:21:57',
          id: 526,
          read: true,
        },
        {
          url: 'https://ah-the-jedi-frontend-staging.herokuapp.com/api/articles/buick-enclave-2/',
          message: "elisha.misoi@andela.com created a new article 'Buick Enclave'.",
          created_at: '2019-06-20 18:21:51',
          id: 525,
          read: false,
        },
      ],
      onClick: jest.fn(),
      setRead: jest.fn(),
    };
    const newComp = shallow(<Notifications {...props} />);

    const bookmarkBtn = newComp.find('#notifyBtn').first();

    bookmarkBtn.simulate('click');
  });

  it('Should display no notifications message', () => {
    const props = {
      notifications: 'string',
      onClick: jest.fn(),
      setRead: jest.fn(),
    };
    const newComp = shallow(<Notifications {...props} />);
  });
});
