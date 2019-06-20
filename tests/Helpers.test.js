import React from 'react';
import { shallow } from 'enzyme';
import { Profile } from '../src/components/profiles/Profile';
import inputError from '../src/helpers/inputerror';
import { errorToast } from '../src/helpers/toastify';
import { isTokenExpired } from '../src/helpers';

describe('Tests for Profile Component with field update', () => {
  it('renders Profile component', () => {
    const props = {
      profile: {
        profile: {
          bio: 'Ying-Yang',
          created_at: '2019-05-16 11:51:11',
          email: 'thismyr2@gmail.com',
          first_name: 'Leewel',
          following: 'False',
          image: '',
          last_name: 'Mwangi',
          updated_at: '2019-06-12 18:12:25',
          username: '',
        },
        isLoading: false,
      },
      followersReducer: {
        followers: { followers: 0 },

        following: { following: 0 },
      },
      fetchProfile: jest.fn(),
      updateProfile: jest.fn(),
      onFormChange: jest.fn(),
    };
    const newComp = shallow(<Profile {...props} />);

    inputError('first-name');

    errorToast('Test Error toast');

    expect(isTokenExpired()).toBe(false);

    expect(newComp.exists()).toBe(true);
  });
});
