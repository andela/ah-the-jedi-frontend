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
    const { tag, onClickTags } = this.props;
    return (
      <button type="button" className="btn btn-outline-secondary tag-button" onClick={onClickTags}>
        {tag}
      </button>
    );
  }
}

TagsSearch.propTypes = {
  tag: PropTypes.string,
  onClickTags: PropTypes.func.isRequired,
};

TagsSearch.defaultProps = {
  tag: '',
};
export default TagsSearch;
