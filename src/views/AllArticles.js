import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { CardDeck } from 'react-bootstrap';
import { connect } from 'react-redux';
import parse from 'html-react-parser';
import { withRouter } from 'react-router-dom';
import { fetchArticles } from '../redux/actions/FetchArticlesActions';
import Article from '../components/articles/Article';
import { Loader } from '../components/layout/Loader';
import { ARTICLES_URL } from '../redux/constants';
import Pagination from '../components/articles/Pagination';
import { fetchTags } from '../redux/actions/TagsAction';
import TagsSearch from '../components/articles/TagsSearch';
import { search } from '../redux/actions/SearchAction';

class AllArticles extends Component {
  state = {
    ArticlesPerPage: 9,
    currentPage: '',
  };

  componentWillMount() {
    const { fetchArticles: fetchAllArticles, fetchTags: fetchAllTags } = this.props;
    this.setState({ currentPage: 1 });
    fetchAllArticles(ARTICLES_URL);
    fetchAllTags();
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

  onClickTags = event => {
    const { history } = this.props;
    event.preventDefault();
    history.push(`/search-by-tag?tag=${event.target.textContent}`);
  };

  /*
   * Render tags search Component
   * Map all tags retrieved to the TagsSearch component
   *@return {jsx}
   */
  renderTags = tags => tags.map(
    (tag, key) => <TagsSearch key={key} tag={tag} onClickTags={this.onClickTags} />,
  );

  render() {
    const { articles, allTags } = this.props;
    const isFetchingArticles = articles.isLoading;
    const isFetchingTags = allTags.isLoading;

    if (!isFetchingArticles && !isFetchingTags) {
      const {
        articles: {
          articles: { data },
        },
        allTags: { message },
      } = this.props;

      const {
        results, previous, next, count,
      } = { ...data };

      const { ArticlesPerPage, currentPage } = this.state;
      const tags = message.data ? message.data.Tags : [];

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(count / ArticlesPerPage); i++) {
        pageNumbers.push(i);
      }
      return (
        <div className="container">
          <h1>Latest Articles</h1>
          <hr />
          <div className="scrollmenu">{this.renderTags(tags)}</div>
          <hr />
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
  allTags: state.TagsReducer,
  searchedTags: state.SearchReducer,
});

export const mapDispatchToProps = () => ({
  fetchArticles,
  fetchTags,
  search,
});

AllArticles.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired,
  articles: PropTypes.shape({}),
  allTags: PropTypes.shape({}),
  history: PropTypes.func.isRequired,
};

AllArticles.defaultProps = {
  articles: PropTypes.shape({}),
  allTags: PropTypes.shape({}),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(withRouter(AllArticles));
