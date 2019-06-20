/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Form } from 'react-bootstrap';
import '../../assets/styles/articles.scss';
import { connect } from 'react-redux';
import { Loader } from '../layout/Loader';
import OneArticle from './OneArticle';
import { isTokenExpired, errorToast } from '../../helpers';
import { fetchOneArticle, deleteArticle } from '../../redux/actions/FetchArticlesActions';
import { fetchBookmark } from '../../redux/actions/bookmarkActions';
import { createReport } from '../../redux/actions/ArticlesReportsActions';

class ReadArticle extends Component {
  state = {
    reason: '',
  }

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

  handleChange=(e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  /** check if textarea
   * is empty else try
   * to report */
  handleReport=(reason, id) => {
    if (reason.trim()) {
      this.props.createReport({ reason, article: id });
    } else {
      errorToast('Please enter reason for reporting this article');
    }
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

  /*
 * Defines the reporting article function
 *takes id of article as param
 *reason is gotten from the local state
 *uses the react-confirm-alert library for
 *displaying the alert
 */
  reportClick = (id) => {
    confirmAlert({
      title: 'Report Article',
      message:
  <Form>
    <Form.Group>
      <Form.Control as="textarea" rows="3" id="reason" onChange={this.handleChange} placeholder="Enter reason for reporting this article" />
    </Form.Group>
    <Form.Text className="text-muted" id="report-error">

    </Form.Text>
  </Form>,
      buttons: [
        {
          label: 'Report',
          onClick: () => this.handleReport(this.state.reason.toLowerCase(), id),
        },
        {
          label: 'Cancel',
        },
      ],
    });
  }

  render() {
    let article;
    const {
      article: { isLoading },
      bookmark: { articles: bookmarkedArticles },
      history,
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
          id={data.id}
          body={data.body}
          handleClick={this.handleClick}
          bookmarks={bookmarkedArticles}
          tags={data.tag_list}
          history={history}
          reportClick={this.reportClick}
          reason={this.state.reason}
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
  createReport,
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
