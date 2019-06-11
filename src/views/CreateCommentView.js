import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createComment } from '../redux/actions/CreateCommentAction';
import CreateComment from '../components/comments/createComment.js';
import LoaderView from '../components/layout/Loader';

/*
 *class CreateCommentView that enables adding a
 *comment
 */
class CreateCommentView extends Component {
  state = {
    comment: '',
  };

  /*
   *This function changes the state for
   *comment
   */
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  /*
   *This function is fired when
   *a form is submitted
   *and interacts with the action createComment
   *from props
   *
   */
  onSubmit = event => {
    event.preventDefault();
    const { createComment, history, slug } = this.props;
    createComment(
      {
        comment: this.state.comment,
      },
      slug,
      history,
    );
  };

  render() {
    const { createComments } = this.props;
    return (
      <CreateComment
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        isLoading={this.props.isLoading}
      />
    );
  }
}

export const mapDispatchToProps = () => ({
  createComment,
});

export const mapStateToProps = state => ({
  createComments: state.createComment,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(CreateCommentView);
