import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { search } from '../redux/actions/SearchAction';
import SearchComponent from '../components/articles/SearchComponent';
import SearchEmpty from '../components/articles/SearchEmpty';
import AuthorsSearch from '../components/articles/AuthorsSearch';
import ArticlesSearch from '../components/articles/ArticlesSearch';
import TagsSearch from '../components/articles/TagsSearch';

/*
 * SearchView Component
 *
 *@return {js} to display SearchView
 */
class SearchView extends Component {
  static get propTypes() {
    return {
      search: PropTypes.func.isRequired,
      response: PropTypes.shape({}).isRequired,
    };
  }

  state = {
    search: '',
  };

  /*
   * onChange:
   * gets the value from the input
   * and adds them to the search state
   */
  onChange = event => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  /*
   * onSubmit:
   * gets the state of search
   * and submits the form
   */
  onSubmit = event => {
    event.preventDefault();
    const { search } = this.props;
    const query = 'search';
    search(query, this.state.search);
  };

  /*
   * onClickArticles:
   * gets articles with title in search keyword
   * return{jsx}
   */
  onClickArticles = event => {
    event.preventDefault();
    const { search } = this.props;
    const query = 'title';
    search(query, this.state.search);
    return <ArticlesSearch />;
  };

  /*
   * onClickAuthors:
   * gets authors with name in search keyword
   * return{jsx}
   */
  onClickAuthors = event => {
    event.preventDefault();
    const { search } = this.props;
    const query = 'author';
    search(query, this.state.search);
    return <AuthorsSearch />;
  };

  /*
   * onClickTags:
   * gets the tags with name in search keyword
   * return{jsx}
   */
  onClickTags = event => {
    event.preventDefault();
    const { search } = this.props;
    const query = 'tag';
    search(query, this.state.search);
    return <TagsSearch />;
  };

  /*
   * onSearchEmpty:
   * gets the search empty component if a keyword is not found
   * when searching
   * return{jsx}
   */
  searchEmpty = errorMessage => (
    <SearchEmpty
      searchState={this.state}
      onChange={this.onChange}
      onSubmit={this.onSubmit}
      errorMessage={errorMessage}
      onClickArticles={this.onClickArticles}
      onClickAuthors={this.onClickAuthors}
      onClickTags={this.onClickTags}
    />
  );

  render() {
    const { response } = this.props;
    const errorMessage = response.error;
    const values = Object.values(response.message);
    if (errorMessage === 'We could not find what you are looking for.') {
      return this.searchEmpty(errorMessage);
    }
    return (
      <SearchComponent
        searchState={this.state}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        values={values}
        onClickArticles={this.onClickArticles}
        onClickAuthors={this.onClickAuthors}
        onClickTags={this.onClickTags}
      />
    );
  }
}

/*
 * mapDispatchToProps:
 * gets the response from dispatch
 * and maps it to props
 */

const mapDispatchToProps = () => ({
  search,
});

/*
 * mapStateToProps:
 * gets the state of the application
 * and maps it to props
 */
const mapStateToProps = state => ({
  response: state.SearchReducer,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(SearchView);
