import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/searchComponent.scss';

/*
* SearchTagEmpty Component
* render an empty component with a message when search keyword is not found
*@return {jsx}
*/
class SearchTagEmpty extends Component {
  render() {
    const {
      errorMessage,
    } = this.props;
    return (
      <div className="container h-100">
        <hr />
        <div>
          <p className="no-content">{errorMessage}</p>
        </div>
      </div>
    );
  }
}

SearchTagEmpty.propTypes = {
  errorMessage: PropTypes.string,
};

SearchTagEmpty.defaultProps = {
  errorMessage: '',
};
export default SearchTagEmpty;
