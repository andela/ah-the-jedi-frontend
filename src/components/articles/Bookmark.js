/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  bookmarkArticle,
  unbookmarkArticle,
  setBookmarked,
} from '../../redux/actions/bookmarkActions';

/*
 * Bookmark Component
 *
 *@return {jsx}
 */

export class Bookmark extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isClicked: false,
    };
  }

  onClick = isBookmarked => {
    const { isClicked } = this.state;

    const {
      bookmarkArticle: articleBookmark,
      unbookmarkArticle: articleUnbookmark,
      setBookmarked: bookmarkSet,
      slug,
    } = this.props;

    isBookmarked
      ? bookmarkSet(slug)
      : this.setState(prevState => ({ ...prevState, isClicked: !prevState.isClicked }));

    isClicked || isBookmarked ? articleUnbookmark(slug) : articleBookmark(slug);
  };

  render() {
    let { isClicked } = this.state;

    const {
      bookmarks,
      slug,
      bookmarked: { error },
    } = this.props;

    const articleSlugs = bookmarks.map(bmk => bmk.slug);

    const bookmarkExists = articleSlugs.includes(slug);

    isClicked = isClicked || bookmarkExists;

    if (error && error === 'You cannot bookmark your own article') {
      isClicked = false;
    }

    return (
      <div className="fluid bookmark">
        <span
          className={
            isClicked ? 'mdi mdi-bookmark bookmarks' : 'mdi mdi-bookmark-outline bookmarks'
          }
          onClick={() => this.onClick(bookmarkExists)}
          role="button"
          id="bookmarkBtn"
        />
      </div>
    );
  }
}

Bookmark.propTypes = {
  bookmarkArticle: PropTypes.func.isRequired,
  unbookmarkArticle: PropTypes.func.isRequired,
  setBookmarked: PropTypes.func.isRequired,
  slug: PropTypes.string,
  bookmarks: PropTypes.arrayOf(PropTypes.shape({})),
  bookmarked: PropTypes.shape({}),
};

Bookmark.defaultProps = {
  slug: '',
  bookmarks: [{}],
  bookmarked: { error: '' },
};

const mapStateToProps = state => ({
  bookmarked: state.bookmarkReducer,
});

const mapDispatchToProps = () => ({
  bookmarkArticle,
  unbookmarkArticle,
  setBookmarked,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Bookmark);
