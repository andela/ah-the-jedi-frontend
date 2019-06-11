import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/comments.scss';

/*
 * create Comment component
 * creates a comment
 * @return {jsx}
 */
class CreateComment extends Component {
  render() {
    const { onSubmit, onChange, isLoading } = this.props;
    return (
      <form onSubmit={onSubmit} className="form-horizontal" id="commentForm">
        <div className="form-group">
          <label htmlFor="email" className="col-sm-2 control-label">
            Comment
          </label>
          <div className="col-sm-10">
            <textarea
              onChange={onChange}
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

CreateComment.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  isLoading: PropTypes.bool,
};

CreateComment.defaultProps = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  isLoading: false,
};

export default CreateComment;
