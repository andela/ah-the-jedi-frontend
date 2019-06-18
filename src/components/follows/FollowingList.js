import React, { Component } from 'react';
import { connect } from 'react-redux';
import Authhelper from '../../helpers/Authhelper';
import { getFollowing } from '../../redux/actions/followersAction';
import Follower from './Follower';

class FollowingList extends Component {
  Auth = new Authhelper();

  componentDidMount() {
    const { getFollowing } = this.props;
    const token = this.Auth.getToken();
    getFollowing(token);
  }

  render() {
    const { followersReducer } = this.props;
    const myfollowing = followersReducer.following.users;
    if (myfollowing) {
      const following = myfollowing.map((following, index) => (
        <Follower key={index} username={following.username} />
      ));
      return <div id="following">{following}</div>;
    }
    return <div id="following" />;
  }
}

const mapStateToProps = ({ followersReducer, profile }) => ({
  followersReducer,
  profile,
});

const mapDispatchToProps = () => ({
  getFollowing,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(FollowingList);
