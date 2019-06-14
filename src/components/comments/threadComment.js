import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/comments.scss';

/*
 * create ThreadComment component
 * creates a child comment
 * @return {jsx}
 */
class ThreadComment extends Component {
  render() {
    const {
      onSubmit, onChange, isLoading, commentId,
    } = this.props;
    return (
      <form onSubmit={onSubmit} className="form-horizontal" id="commentForm">
        <div className="form-group">
          <label htmlFor="email" className="col-sm-2 control-label">
            Comment
          </label>
          <div className="col-sm-10">
            <textarea
              onChange={onChange}
              id={commentId}
              className="form-control"
              name="comment"
              rows="3"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button
              className="btn-link btn-circle text-uppercase focus-click"
              type="submit"
              id="submitComment"
            >
              <span className="glyphicon glyphicon-send" />
              {' '}
Add comment
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ThreadComment.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  commentId: PropTypes.number,
};

ThreadComment.defaultProps = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  isLoading: false,
  commentId: 0,
};

export default ThreadComment;
