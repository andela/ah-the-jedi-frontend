import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticlesSearch from './ArticlesSearch';
import AuthorsSearch from './AuthorsSearch';
import TagsSearch from './TagsSearch';
import { search } from '../../redux/actions/SearchAction';
import SearchTagEmpty from './SearchTagEmpty';
import '../../assets/styles/searchComponent.scss';
/*
 * Search Component
 * Display articles, authors and tags components with
 * keywords searched.
 *@return {jsx}
 */
class SearchArticleByTag extends Component {
  componentWillMount() {
    const { search: searchArticleByTags } = this.props;
    const getUrlParams = new URL(window.location.href);
    const queryData = getUrlParams.searchParams.get('tag');
    const query = 'tag';
    searchArticleByTags(query, queryData);
  }

  /*
   * Render articles search Component
   * Map all articles retrieved to the ArticlesSearch component
   *@return {jsx}
   */
  renderArticle = values => values.map(value => <ArticlesSearch key={value.id} value={value} />);

  /*
   * Render tags search Component
   * Map all tags retrieved to the TagsSearch component
   *@return {jsx}
   */
  renderTags = values => {
    const arrTags = values.map(value => value.tag_list).flat();
    const tagSet = new Set(arrTags);
    const tags = Array.from(tagSet);
    return tags.map((tag, index) => <TagsSearch key={index} tag={tag} />);
  };

  /*
   * Render authors search Component
   * Map authors retrieved to the AuthorsSearch component
   *@return {jsx}
   */
  renderAuthors = values => {
    const arrAuthors = values.map(value => value.author.username);
    const authorSet = new Set(arrAuthors);
    const authors = Array.from(authorSet);
    return authors.map((author, index) => <AuthorsSearch author={author} key={index} />);
  };

  searchTagEmpty = errorMessage => (
    <SearchTagEmpty
      errorMessage={errorMessage}
    />
  );

  render() {
    const { searchedTags } = this.props;
    const values = Object.values(searchedTags.message);
    if (searchedTags.error === 'We could not find what you are looking for.') {
      return this.searchTagEmpty(searchedTags.error);
    }
    return (
      <div className="container h-100">
        <div className="container-fluid">
          <div className="row content">
            <br />
            <div className="col-sm-9">
              <hr />
              <h4>Articles</h4>
              {this.renderArticle(values)}
            </div>
            <div className="col-sm-3">
              <div className="column content">
                <hr />
                <h4>Tags</h4>
                {this.renderTags(values)}
                <hr />
                <h4>Authors</h4>
                {this.renderAuthors(values)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SearchArticleByTag.propTypes = {
  searchedTags: PropTypes.PropTypes.shape({}),
  search: PropTypes.func.isRequired,
};

SearchArticleByTag.defaultProps = {
  searchedTags: {},
};

export const mapStateToProps = state => ({
  searchedTags: state.SearchReducer,
});

export const mapDispatchToProps = () => ({
  search,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(SearchArticleByTag);
