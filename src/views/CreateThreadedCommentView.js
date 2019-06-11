import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createThreadComment } from '../redux/actions/CreateCommentAction';
import ThreadComment from '../components/comments/threadComment.js';

/*
 *class CreateThreadView that enables commenting on
 *a comment
 */
class CreateThreadView extends Component {
  state = {
    id: '',
    comment: '',
  };

  /*
   *This function changes the state for for
   *comment
   */
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      id: e.target.id,
    });
  };

  /*
   *This function is fired when
   *a form is submitted
   *and interacts with the action create_comment
   *from props
   *
   */
  onSubmit = event => {
    event.preventDefault();
    const { createThreadComment, history, slug } = this.props;
    createThreadComment(
      {
        comment: this.state.comment,
        id: this.state.id,
      },
      slug,
      history,
    );
  };

  render() {
    const { commentId, create_comment } = this.props;
    if (localStorage.getItem('token')) {
      return (
        <ThreadComment
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          isLoading={this.props.create_comment.isLoading}
          commentId={commentId}
          isLoading={create_comment.isLoading}
        />
      );
    }
    return <div className="reply-error">Kindly log in to reply</div>;
  }
}

export const mapDispatchToProps = () => ({
  createThreadComment,
});

export const mapStateToProps = state => ({
  create_comment: state.create_comment,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(CreateThreadView);
