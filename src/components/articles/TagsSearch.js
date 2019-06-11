import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/searchComponent.scss';

/*
* Tags search Component
* Display tags that contain keyword searched
*@return {jsx}
*/
class TagsSearch extends Component {
  render() {
    const { tag } = this.props;
    return (
      <div>
        <button type="button" className="btn btn-default border border-white">
          {tag}
        </button>
      </div>
    );
  }
}

TagsSearch.propTypes = {
  tag: PropTypes.string,
};

TagsSearch.defaultProps = {
  tag: '',
};
export default TagsSearch;
