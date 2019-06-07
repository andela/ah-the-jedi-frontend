/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardColumns, Spinner } from 'react-bootstrap';
import { fetchByAuthor, deleteArticle } from '../../redux/actions/FetchArticlesActions';

/*
 * User Articles Component
 *
 *@return {jsx}
 */

export class UserArticles extends Component {
  componentWillMount() {
    const {
      fetchByAuthor: fetchUserArticles,
      history,
      match: {
        params: { username },
      },
    } = this.props;
    fetchUserArticles(username, history);
  }

  render() {
    const {
      match: {
        params: { username },
      },
    } = this.props;

    let userArticles;

    if (
      this.props.authorArticles &&
      this.props.authorArticles.authorArticles &&
      this.props.authorArticles.authorArticles.data
    ) {
      const { results } = this.props.authorArticles.authorArticles.data;
      userArticles = results.map((values, index) => (
        <Card className="p-3" key={index}>
          <Link to={`articles/${values.slug}`}>
            <Card.Title>{values.title}</Card.Title>
            <Card.Text>{values.description}</Card.Text>
          </Link>
          <footer>
            <small className="text-muted">{moment(values.created_at).format('MMMM Do YYYY')}</small>
            -
            <small className="text-muted">
              {values.readtime}
              read
            </small>
          </footer>
        </Card>
      ));
    } else if (this.props.authorArticles.isLoading) {
      userArticles = (
        <div className="text-center" id="no-user-articles">
          <span>Loading articles...</span>
          <Spinner animation="grow" variant="primary" />
        </div>
      );
    } else {
      userArticles = <div className="ml-5">No articles to display for @{username}</div>;
    }

    return (
      <div className="container">
        <CardColumns className="all-articles" id="user-articles-test">
          {userArticles}
        </CardColumns>
        <hr />
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  authorArticles: state.FetchArticlesReducer,
});

export const mapDispatchToProps = () => ({
  fetchByAuthor,
  deleteArticle,
});

UserArticles.propTypes = {
  match: PropTypes.shape({}),
  fetchByAuthor: PropTypes.func.isRequired,
};

UserArticles.defaultProps = {
  match: { params: { username: 'user' } },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(withRouter(UserArticles));
