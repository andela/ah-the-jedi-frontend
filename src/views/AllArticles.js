import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CardColumns, CardDeck } from 'react-bootstrap';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import { fetchArticles } from '../redux/actions/FetchArticlesActions';
import Article from '../components/articles/Article';
import { Loader } from '../components/layout/Loader';
import { ARTICLES_URL } from '../redux/constants';
import Pagination from '../components/articles/Pagination';

class AllArticles extends Component {
  state = {
    ArticlesPerPage: 9,
    currentPage: '',
  };

  componentWillMount() {
    const { fetchArticles: fetchAllArticles } = this.props;
    this.setState({ currentPage: 1 });
    fetchAllArticles(ARTICLES_URL);
  }

  handleClick = e => {
    const { fetchArticles: fetchAllArticles } = this.props;
    const id = Number(e.target.id);
    fetchAllArticles(`${ARTICLES_URL}?page=${id}`);
    this.setState({
      currentPage: id,
    });
  };

  handleLink = e => {
    const { fetchArticles: fetchAllArticles } = this.props;
    const url = e.target.id;
    const id = url.substring(url.lastIndexOf('=') + 1);
    this.setState({ currentPage: Number(id) });
    fetchAllArticles(url);
  };

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

      const {
        results, previous, next, count,
      } = { ...data };

      const { ArticlesPerPage, currentPage } = this.state;

      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(count / ArticlesPerPage); i++) {
        pageNumbers.push(i);
      }
      return (
        <div className="container">
          <h1>Latest Articles</h1>
          <CardDeck>
            {results
              && results.map(values => (
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
          </CardDeck>

          <Pagination
            handleLink={this.handleLink}
            handleClick={this.handleClick}
            pageNumbers={pageNumbers}
            next={next}
            previous={previous}
            currentPage={currentPage}
          />

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
