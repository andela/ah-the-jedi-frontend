import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CardColumns } from 'react-bootstrap';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import { fetchArticles } from '../redux/actions/FetchArticlesActions';
import Article from '../components/articles/Article';
import { Loader } from '../components/layout/Loader';

class AllArticles extends Component {
  componentWillMount() {
    const { fetchArticles: fetchAllArticles } = this.props;
    fetchAllArticles();
  }

  render() {
    const {
      articles: { isLoading },
    } = this.props;

    if (!isLoading) {
      const {
        articles: {
          articles: { data },
        },
      } = this.props;

      const { results } = { ...data };

      return (
        <div className="container">
          <h1>Latest Articles</h1>
          <CardColumns className="all-articles">
            {results && results.map((values) => (
              <Article
                title={values.title}
                key={values.id}
                description={values.description}
                readtime={values.readtime}
                created_at={moment(values.created_at).format('MMMM Do YYYY')}
                author={values.author.username}
                image={values.image}
                slug={values.slug}
                read_count={values.read_count}
                body={parse(values.body)}
              />
            ))}
          </CardColumns>
          <hr />
        </div>
      );
    }

    return <Loader />;
  }
}

export const mapStateToProps = state => ({
  articles: state.FetchArticlesReducer,
});

export const mapDispatchToProps = () => ({
  fetchArticles,
});

AllArticles.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.shape({}),
};

AllArticles.defaultProps = {
  articles: PropTypes.shape({}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(AllArticles);
