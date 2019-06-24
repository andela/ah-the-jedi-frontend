import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loader } from '../layout/Loader';
import { fetchBookmark } from '../../redux/actions/bookmarkActions';
import SearchTagEmpty from './SearchTagEmpty';
import ListBookmarks from './ListBookmarks';
import '../../assets/styles/searchComponent.scss';
/*
 * Search Component
 * Display articles, authors and tags components with
 * keywords searched.
 *@return {jsx}
 */
class BookmarkedArticles extends Component {
  componentWillMount() {
    const { fetchBookmark: getBookmarkedArticles } = this.props;
    const slug = 'my-new-article3';
    getBookmarkedArticles(slug);
  }

  /*
   * Render articles search Component
   * Map all articles retrieved to the ArticlesSearch component
   *@return {jsx}
   */
  renderArticle = values => values.map(value => <ListBookmarks key={value.id} value={value} />);

  searchTagEmpty = errorMessage => <SearchTagEmpty errorMessage={errorMessage} />;

  render() {
    const { bookmarkedArticles } = this.props;
    const isFetchingBookmark = bookmarkedArticles.isLoading;
    if (!isFetchingBookmark) {
      const { articles } = bookmarkedArticles;
      const bookmarks = articles || [];
      const values = [];
      Object.entries(bookmarks).forEach(([key, value]) => values.push(value));
      const error = 'You have no bookmarked articles yet';
      if (bookmarks === []) {
        return this.searchTagEmpty(error);
      }
      return (
        <div className="container h-100">
          <div className="container-fluid">
            <div className="row content">
              <br />
              <div className="col-sm-9">
                {this.renderArticle(values)}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <Loader />;
  }
}

BookmarkedArticles.propTypes = {
  bookmarkedArticles: PropTypes.PropTypes.shape({}),
  fetchBookmark: PropTypes.func.isRequired,
};

BookmarkedArticles.defaultProps = {
  bookmarkedArticles: {},
};

export const mapStateToProps = state => ({
  bookmarkedArticles: state.bookmarkReducer,
});

export const mapDispatchToProps = () => ({
  fetchBookmark,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(BookmarkedArticles);
