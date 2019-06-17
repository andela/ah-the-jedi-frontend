/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import InlineEditable from 'react-inline-editable-field';
import moment from 'moment';
import PropTypes from 'prop-types';

import '../../assets/styles/profile.scss';
import FollowsView from '../follows/Follows';
import UserArticlesView from '../articles/UserArticles';
import { fetchProfile, updateProfile } from '../../redux/actions/profileActions';
import LoaderView from '../layout/Loader';


/*
 * Profile Component
 *
 *@return {jsx}
 */

export class Profile extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isChanged: false,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { username },
      },
      history,
    } = this.props;

    const { fetchProfile: fetchUserProfile } = this.props;

    fetchUserProfile(username, history);
  }

  onFormChange = (e, isChanged = true) => {
    this.setState({
      image: e.target.files[0],
      isChanged,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      first_name, last_name, bio, image,
    } = this.state;

    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }
    if (first_name) {
      formData.append('first_name', first_name);
    }
    if (last_name) {
      formData.append('last_name', last_name);
    }
    if (bio) {
      formData.append('bio', bio);
    }

    const {
      match: {
        params: { username },
      },
      history,
      updateProfile: updateUserProfile,
    } = this.props;

    updateUserProfile(username, formData, history);

    this.setState({ isChanged: false });
  };

  updateListing(isChanged, key, val) {
    this.setState({ [key]: val, isChanged });
  }

  render() {
    const {
      isChanged: isLocalChanged, first_name, last_name, bio,
    } = this.state;

    const {
      profile: { profile },
    } = this.props;

    const username = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).username
      : '';

    const isProfileOwner = username === profile.username;

    const isOwner = profile.following === 'True' ? 'Following' : 'Follow';

    const { profile: state } = this.props;

    const nameInput = content => (
      <div>
        <p className="text-muted mr-2">{content || ' -------- '}</p>
      </div>
    );

    const bioInput = () => <p className="proile-rating ">{profile.bio}</p>;

    const InlineField = (
      key,
      isProfOwner = isProfileOwner,
      placeHolder = '',
      content = '',
      field = '',
      id = '',
    ) => {
      const inline = (
        <InlineEditable
          content={content}
          inputType="textarea"
          displayPlaceholder={placeHolder}
          onBlur={(val, isChanged) => {
            this.updateListing(isChanged, key, val);
          }}
          style={{ width: '200px', borderBottom: '1px solid #D3D3D3' }}
          inputStyle={{ width: '150px' }}
          className=""
          id={id}
        />
      );
      return isProfOwner ? inline : field(placeHolder);
    };

    if (!state.isLoading) {
      return (
        <div className="container emp-profile">
          <form onSubmit={this.onSubmit} id="profile-form">
            <div className="row">
              <div className="col-md-4 mt-2">
                <div className="profile-img">
                  <img
                    src={
                      profile.image
                      || 'https://res.cloudinary.com/do8v0ew77/image/upload/v1559819721/20190606111521.png'
                    }
                    alt=""
                  />
                  <div className={isProfileOwner ? 'file btn btn-lg btn-primary' : 'hidden'}>
                    Change Photo
                    <input type="file" name="file" accept="image/*" id="image-input" onChange={this.onFormChange} />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head mt-3">
                  <div className="row">
                    <div className="col-md-6">
                      <h2>{profile.username}</h2>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="submit"
                        className={isProfileOwner ? 'hidden' : 'profile-edit-btn btn-primary'}
                      >
                        {isOwner}
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 mb-4">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label className="font-weight-bold">First Name</label>
                        </div>

                        <div className="col-md-6 in-line">
                          <div className="row">
                            <div className="col-md-6">
                              <i
                                className={isProfileOwner ? 'fa fa-pencil fa-sm mr-3' : 'hidden'}
                              />
                            </div>
                          </div>
                          {InlineField(
                            'first_name',
                            isProfileOwner,
                            profile.first_name,
                            first_name,
                            nameInput,
                            'first-name',
                          )}
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label className="font-weight-bold">Last Name</label>
                        </div>

                        <div className="col-md-6 in-line">
                          <div className="row">
                            <div className="col-md-6">
                              <i
                                className={isProfileOwner ? 'fa fa-pencil fa-sm mr-3' : 'hidden'}
                              />
                            </div>
                          </div>
                          {InlineField(
                            'last_name',
                            isProfileOwner,
                            profile.last_name,
                            last_name,
                            nameInput,
                            'last-name',
                          )}
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label className="font-weight-bold">Email</label>
                        </div>
                        <div className="col-md-6">
                          <p className="text-muted ">{profile.email}</p>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label className="font-weight-bold">Member Since</label>
                        </div>
                        <div className="col-md-6">
                          <p className="text-muted ">
                            {moment(profile.created_at).format('MMMM Do YYYY')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <FollowsView />

                  <div className={isProfileOwner ? 'mt-5 in-line ' : ''}>
                    <div className="row">
                      <div className="col-md-6">
                        <i className={isProfileOwner ? 'fa fa-pencil fa-sm mr-3' : 'hidden'} />
                      </div>
                    </div>
                    {InlineField('bio', isProfileOwner, profile.bio, bio, bioInput, 'bio')}
                  </div>

                  <div className="row in-line mt-5 mb-5">
                    <div className="col-md-12 save-btn">
                      <div className={isLocalChanged ? 'col-md-6' : 'hidden'}>
                        <button
                          type="submit"
                          className={isLocalChanged ? 'profile-edit-btn btn-primary' : 'hidden'}
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>

                  <ul className="nav nav-tabs mt-1" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link bold active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Articles
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-2" />
            </div>
          </form>

          <UserArticlesView />
        </div>
      );
    }
    return <LoaderView />;
  }
}

Profile.propTypes = {
  match: PropTypes.shape({}),
  profile: PropTypes.shape({}),
  history: PropTypes.shape({}),
  fetchProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  match: { params: { username: 'user' } },
  profile: { profile: {} },
  history: {},
};
const mapStateToProps = ({ profile }) => ({
  profile,
});

const mapDispatchToProps = () => ({
  fetchProfile,
  updateProfile,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Profile);
