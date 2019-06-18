import React, { Component } from 'react';
import { connect } from 'react-redux';
import Authhelper from '../../helpers/Authhelper';
import { getFollowers } from '../../redux/actions/followersAction';
import Follower from './Follower';

class FollowersList extends Component {
  Auth = new Authhelper();

  componentDidMount() {
    const { getFollowers } = this.props;
    const token = this.Auth.getToken();
    getFollowers(token);
  }

  render() {
    const { followersReducer } = this.props;
    const myfollowers = followersReducer.followers.users;

    if (myfollowers) {
      const followers = myfollowers.map((follower, index) => (
        <Follower key={index} username={follower.username} />
      ));
      return <div id="followers">{followers}</div>;
    }
    return <div id="followers" />;
  }
}

const mapStateToProps = ({ followersReducer, profile }) => ({
  followersReducer,
  profile,
});

const mapDispatchToProps = () => ({
  getFollowers,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(FollowersList);
