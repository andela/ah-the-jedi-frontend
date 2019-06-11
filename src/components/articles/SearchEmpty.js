import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../assets/styles/searchComponent.scss';

/*
* SearchEmpty Component
* render an empty component with a message when search keyword is not found
*@return {jsx}
*/
class SearchEmpty extends Component {
  render() {
    const {
      onChange,
      onSubmit,
      errorMessage,
      onClickArticles,
      onClickAuthors,
      onClickTags,
      searchState,
    } = this.props;
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <form onSubmit={onSubmit} className="col-10">
            <input
              type="text"
              className="inp col-10"
              id="search"
              name="search"
              onChange={onChange}
              value={searchState.search}
            />
          </form>
        </div>
        <div>
          <ul className="nav">
            <li className="nav-item">
              <Link to="#article-title" className="nav-link" onClick={onClickArticles}>
                Title
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#authors" className="nav-link" onClick={onClickAuthors}>
                Authors
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#tags" className="nav-link" onClick={onClickTags}>
                Tags
              </Link>
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <p className="no-content">{errorMessage}</p>
        </div>
      </div>
    );
  }
}

SearchEmpty.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickArticles: PropTypes.func.isRequired,
  onClickAuthors: PropTypes.func.isRequired,
  onClickTags: PropTypes.func.isRequired,
  searchState: PropTypes.shape({}),
  errorMessage: PropTypes.string,
};

SearchEmpty.defaultProps = {
  searchState: {},
  errorMessage: '',
};
export default SearchEmpty;
