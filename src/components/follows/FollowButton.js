import React, { Component } from 'react';

class FollowButton extends Component {
  render() {
    debugger;
    const { isProfileOwner, isOwner } = this.props;
    return (
      <button type="submit" className={isProfileOwner ? 'hidden' : 'profile-edit-btn btn-primary'}>
        {isOwner}
      </button>
    );
  }
}

export default FollowButton;
