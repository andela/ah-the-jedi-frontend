import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FetchUserprofile } from '../../redux/actions/followersAction';
import { DefaultProfPic } from '../../redux/constants';
import Authhelper from '../../helpers/Authhelper';
import '../../assets/styles/follower.scss';

class Follower extends Component {
  state = {
    user: {
      username: '',
      bio: '',
    },
  };

  Auth = new Authhelper();

  componentDidMount() {
    const { username } = this.props;
    const token = this.Auth.getToken();

    FetchUserprofile(username, token).then(response => {
      const user = response.data.profile;
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="container" id="follower">
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-2 myImage">
              <a href="#">
                <img
                  className="media-object rounded myImage"
                  src={user.image || DefaultProfPic}
                  alt="profile_pic"
                />
              </a>
            </div>
            <div className="col-md-8">
              <br />
              <h4 className="media-heading">{user.username}</h4>

              {user.bio}
            </div>
            <div className="col-md-2 myButton">
              <br />
              <a href={`@${user.username}`}>
                <Button variant="outline-primary">View Profile</Button>
              </a>
            </div>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

const mapStateToProps = ({ followersReducer, state }) => ({
  followersReducer,
  state,
});

export default connect(mapStateToProps)(withRouter(Follower));
