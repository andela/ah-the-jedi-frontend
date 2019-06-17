/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../../assets/styles/articles.scss';
import { connect } from 'react-redux';
import { Loader } from '../layout/Loader';
import OneArticle from './OneArticle';
import { isTokenExpired, errorToast } from '../../helpers';
import { fetchOneArticle, deleteArticle } from '../../redux/actions/FetchArticlesActions';
import { fetchBookmark } from '../../redux/actions/bookmarkActions';

class ReadArticle extends Component {
  componentWillMount() {
    const {
      match: {
        params: { slug },
      },
    } = this.props;
    const { history, fetchOneArticle: fetchsSingle, fetchBookmark: bookmarkFetch } = this.props;
    fetchsSingle(slug, history);
    bookmarkFetch(slug);
  }

  handleClick = e => {
    e.preventDefault();
    if (!isTokenExpired()) {
      const { history } = this.props;

      const {
        match: {
          params: { slug },
        },
      } = this.props;
      const { deleteArticle: deleteOne } = this.props;
      deleteOne(slug, history);
    } else if (isTokenExpired()) {
      errorToast('Session has expired please login again');
    }
  };

  render() {
    let article;
    const {
      article: { isLoading },
      bookmark: { articles: bookmarkedArticles },
    } = this.props;

    if (isLoading) {
      article = (
        <div>
          <Loader />
          <span id="loading-span-test">Loading...</span>
        </div>
      );
    } else if (
      this.props.article
      && this.props.article.article
      && this.props.article.article.data
    ) {
      const { data } = this.props.article.article.data;

      article = (
        <OneArticle
          title={data.title}
          description={data.description}
          readtime={data.readtime}
          created_at={moment(data.created_at).format('MMMM Do YYYY')}
          author={data.author.username}
          image={data.image}
          slug={data.slug}
          body={data.body}
          handleClick={this.handleClick}
          bookmarks={bookmarkedArticles}
          tags={data.tag_list}
        />
      );
    }
    return <div id="view-article">{article}</div>;
  }
}

export const mapStateToProps = state => ({
  article: state.FetchArticlesReducer,
  bookmark: state.bookmarkReducer,
});

export const mapDispatchToProps = () => ({
  fetchOneArticle,
  deleteArticle,
  fetchBookmark,
});

ReadArticle.propTypes = {
  fetchOneArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  history: PropTypes.shape({}),
  match: PropTypes.shape({}),
  article: PropTypes.shape({}),
};

ReadArticle.defaultProps = {
  article: {},
  match: { params: { slug: '' } },
  history: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(withRouter(ReadArticle));
