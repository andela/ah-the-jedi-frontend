import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArticlesSearch from './ArticlesSearch';
import AuthorsSearch from './AuthorsSearch';
import TagsSearch from './TagsSearch';
import '../../assets/styles/searchComponent.scss';

/*
* Search Component
* Display articles, authors and tags components with
* keywords searched.
*@return {jsx}
*/
class SearchComponent extends Component {
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

  render() {
    const {
      onChange,
      onSubmit,
      values,
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
              placeholder="Search"
            />
          </form>
        </div>
        <div>
          <ul className="nav">
            <li className="nav-item">
              <Link
                to="#article-title"
                className="nav-link"
                onClick={onClickArticles}
                id="search-title"
              >
                Title
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#authors" className="nav-link" onClick={onClickAuthors} id="search-authors">
                Authors
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#tags" className="nav-link" onClick={onClickTags} id="search-tags">
                Tags
              </Link>
            </li>
          </ul>
        </div>
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

SearchComponent.propTypes = {
  values: PropTypes.arrayOf(PropTypes.shape({})),
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickArticles: PropTypes.func.isRequired,
  onClickAuthors: PropTypes.func.isRequired,
  onClickTags: PropTypes.func.isRequired,
  searchState: PropTypes.shape({}).isRequired,
};

SearchComponent.defaultProps = {
  values: [{}],
};
export default SearchComponent;
