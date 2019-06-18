import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ProfileView, { Profile } from '../src/components/profiles/Profile';
import store from '../src/redux/store';
import avatar from '../src/assets/images/avatar.png';

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

    expect(newComp.exists()).toBe(true);

    const nameInput = newComp.find('#first-name');

    nameInput.simulate('blur', {
      target: {
        name: 'first_name',
        value: 'NamerOliver',
      },
    });
  });

  it('renders with hidden divisions', () => {
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
          username: 'Leewel',
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

    expect(newComp.exists()).toBe(true);
  });

  it('renders mounts Profile component with mapStateToProps', () => {
    const props = {
      profile: {
        profile: {
          bio: 'Ying-Yang',
          created_at: '2019-05-16 11:51:11',
          email: 'thismyr2@gmail.com',
          first_name: '',
          following: 'False',
          image: '',
          last_name: '',
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

    const newComp = mount(
      <Router>
        <Provider store={store}>
          <ProfileView {...props} />
        </Provider>
      </Router>,
    );

    expect(newComp.exists()).toBe(true);
  });

  it('it renders Loader Component if Loading', () => {
    const props = {
      profile: {
        profile: {
          bio: 'Ying-Yang',
          created_at: '2019-05-16 11:51:11',
          email: 'thismyr2@gmail.com',
          first_name: 'Leewel',
          following: 'False',
          image: 'https://res.cloudinary.com/do8v0ew77/image/upload/v1560363144/20190612181223.jpg',
          last_name: 'Mwangi',
          updated_at: '2019-06-12 18:12:25',
          username: '',
        },
        isLoading: true,
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

    const LoaderView = newComp.find('Loader');

    expect(LoaderView).toHaveLength(1);
  });

  it('Should submit profile data successfully', () => {
    const props = {
      profile: {
        profile: {
          bio: 'Ying-Yang',
          created_at: '2019-05-16 11:51:11',
          email: 'thismyr2@gmail.com',
          first_name: '',
          following: 'True',
          image: 'https://res.cloudinary.com/do8v0ew77/image/upload/v1560363144/20190612181223.jpg',
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

    const nameInput = newComp.find('.text-muted').first();

    expect(nameInput.exists()).toBe(true);

    const firstName = newComp.find('#first-name');

    firstName.simulate('blur', {
      target: {
        name: 'first_name',
        value: 'NamerOliver',
      },
    });

    const lastName = newComp.find('#last-name');

    lastName.simulate('blur', {
      target: {
        name: 'last_name',
        value: 'LastNamer',
      },
    });

    const bio = newComp.find('#bio');

    bio.simulate('blur', {
      target: {
        name: 'bio',
        value: 'My simple bio',
      },
    });

    const image = newComp.find('#image-input');

    image.simulate('change', {
      target: {
        files: [avatar],
      },
    });

    newComp.find('#profile-form').simulate('submit', {
      preventDefault: () => {},
      target: [{ value: '' }],
    });

    newComp.update();
  });
});
