import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Authhelper from '../../helpers/Authhelper';
import { userFollow, userUnFollow } from '../../redux/actions/followAction';
import '../../assets/styles/follower.scss';

function FollowButton({
  isProfileOwner,
  isOwner,
  username,
  userFollow,
  userUnFollow,
  followReducer,
}) {
  const Auth = new Authhelper();

  const [isFollowing, setIsFollowing] = useState(isOwner);

  useEffect(() => {
    if (followReducer.success) {
      setIsFollowing(followReducer.isFollowing);
    }
  });

  const handleClick = e => {
    e.preventDefault();

    if (!Auth.isLoggedIn()) {
      window.location.href = '/login';
    } else {
      const token = Auth.getToken();
      if (isFollowing === 'Follow') {
        userFollow(username, token);
      }
      if (isFollowing === 'Following') {
        userUnFollow(username, token);
      }
    }
  };

  const isBtnLoading = followReducer.isLoading;
  let btnClass = 'profile-edit-btn btn-primary';
  if (isFollowing === 'Following') {
    btnClass += ' myBtnClass';
  }

  return (
    <div id="followbtn">
      {isBtnLoading ? (
        <button
          className={
            isProfileOwner || !Auth.isLoggedIn() ? 'hidden' : 'profile-edit-btn btn-primary'
          }
          disabled
          id="btntest"
        >
          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
        </button>
      ) : (
        <button
          className={isProfileOwner || !Auth.isLoggedIn() ? 'hidden' : `${btnClass}`}
          onClick={handleClick}
          id="btntest"
        >
          <span className="FollowingTitle">{isFollowing}</span>
          <span className="unFollow">Unfollow</span>
        </button>
      )}
    </div>
  );
}

const mapStateToProps = ({ followReducer }) => ({
  followReducer,
});

const mapDispatchToProps = () => ({
  userFollow,
  userUnFollow,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(FollowButton);
