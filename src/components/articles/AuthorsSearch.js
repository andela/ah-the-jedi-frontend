import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../assets/styles/searchComponent.scss';
import avatar from '../../assets/images/avatar.png';

/*
* Authors search Component
* Display authors whose names contain keyword searched.
*@return {jsx}
*/
class AuthorsSearch extends Component {
  render() {
    const { author } = this.props;
    return (
      <div className="row content mt-4">
        <div className="col-md-2">
          <img src={avatar} alt="Avatar" className="avatar" />
        </div>
        <div className="col-md-4">
          <a href={`/@${author}`} className="name">
            {author}
          </a>
        </div>
        <div className="col-md-3">
          <button type="button" className="btn btn-outline-primary">
            <Link to={`/@${author}`}>Follow</Link>
          </button>
        </div>
      </div>
    );
  }
}

AuthorsSearch.propTypes = {
  author: PropTypes.string,
};

AuthorsSearch.defaultProps = {
  author: '',
};
export default AuthorsSearch;
