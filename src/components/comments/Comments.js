import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import CreateCommentView from '../../views/CreateCommentView';
import CreateThreadView from '../../views/CreateThreadedCommentView';
import { fetchCommentsAction } from '../../redux/actions/FetchCommentsAction';
import LoaderView from '../layout/Loader';

import '../../assets/styles/comments.scss';

/*
 * Comments display component
 * Maps comments to the respective divs
 * @return {jsx}
 */
class Comments extends Component {
  componentWillMount() {
    const { history, fetchCommentsAction, slug } = this.props;
    fetchCommentsAction(slug, history);
  }

  render() {
    const { slug } = this.props;
    const { isLoading, data } = this.props.myState;
    const comments = data.Comments;
    console.log(comments);

    return (
      <div>
        {comments ? (
          <div>
            {isLoading ? (
              <div className="comments-loader">
                <Spinner animation="grow" variant="primary" />
              </div>
            ) : (
              <div className="container">
                <div className="row">
                  <div className="col-sm-10 col-sm-offset-1" id="logout">
                    {localStorage.getItem('token') ? (
                      <div>
                        <div className="page-header">
                          <h3 className="reviews">Leave your comment</h3>
                        </div>
                        <div className="tab-pane" id="add-comment">
                          <CreateCommentView slug={slug} />
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}

                    <div className="comment-tabs">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item active">
                          <a
                            className="nav-link active"
                            href="#comments-logout"
                            role="tab"
                            data-toggle="tab"
                          >
                            <h4 className=" text-capitalize">
                              Comments
                              {' '}
                              <span className="comments-count">{data.comments_count}</span>
                            </h4>
                          </a>
                        </li>
                        <li className="nav-item" />
                      </ul>

                      <div className="tab-content">
                        <div className="tab-pane active" id="comments-logout">
                          <ul className="media-list">
                            <li className="media">
                              {comments.map((comment, index) => (
                                <div key={index} className="comment-thread">
                                  <a className="pull-left" href={`/@${comment.author.username}`}>
                                    <img
                                      className="media-object img-circle"
                                      src={
                                        comment.author.image
                                        || 'https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999/UP0151-CUSA09971_00-AV00000000000002/1553247440000/image?w=480&h=480&bg_color=000000&opacity=100&_version=00_09_000'
                                      }
                                      alt="profile"
                                    />
                                  </a>
                                  <h4 className="media-heading reviews">
                                    {comment.author.username}
                                    {' '}
                                  </h4>
                                  <div className="media-body">
                                    <div className="well well-lg">
                                      <ul className="media-date reviews list-inline">
                                        {moment(comment.submit_date).format('MMM Do YY')}
                                      </ul>
                                      <p className="media-comment">{comment.comment}</p>
                                      <a
                                        className="btn-link btn-circle text-uppercase reply"
                                        id={comment.id}
                                        data-toggle="collapse"
                                        data-target={`#com-${comment.id}`}
                                        aria-expanded="false"
                                        aria-controls="replyOne"
                                      >
                                        <span className="glyphicon glyphicon-share-alt" />
                                        {' '}
Reply
                                      </a>
                                      <a
                                        className="btn btn-circle text-uppercase"
                                        data-toggle="collapse"
                                        data-target={`#reply-${comment.id}`}
                                        aria-expanded="false"
                                        aria-controls="replyOne"
                                      >
                                        <span className="glyphicon glyphicon-comment" />
                                        <img
                                          className="comment-img"
                                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjRmyTdEmptSEx8tFTZIOXhlGxfMXkNl_oaGYYnPhGGxYo8eMi"
                                          alt="oops"
                                        />
                                        <span className="comments-count">
                                          {comment.children.length}
                                        </span>
                                      </a>
                                      <div className="collapse" id={`com-${comment.id}`}>
                                        <CreateThreadView commentId={comment.id} slug={slug} />
                                      </div>
                                    </div>
                                  </div>

                                  {comment && comment.children && comment.children[0] ? (
                                    <div className="collapse" id={`reply-${comment.id}`}>
                                      {comment.children.map((child, index) => (
                                        <ul key={index} className="media-list threaded">
                                          <li className="media-replied">
                                            <a className="pull-left" href="#">
                                              <img
                                                className="media-object img-circle thread-image"
                                                src="https://vignette.wikia.nocookie.net/rick-and-morty933/images/a/a6/Rick_Sanchez.png/revision/latest?cb=20170925123206&path-prefix=de"
                                                alt="profile"
                                              />
                                            </a>
                                            <h4 className="media-heading child-reviews">
                                              {child.author.username}
                                              {' '}
                                            </h4>
                                            <div className="media-body">
                                              <div className="well well-lg">
                                                <h4 className="media-heading reviews">
                                                  <span className="glyphicon glyphicon-share-alt" />
                                                </h4>
                                                <ul className="media-date reviews list-inline">
                                                  {moment(child.submit_date).format('MMM Do YY')}
                                                </ul>

                                                <p className="media-comment">{child.comment}</p>
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="collapse" id={`reply-${comment.id}`} />
                                  )}
                                </div>
                              ))}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div>
              <div className="page-header">
                <h3 className="reviews">Leave your comment</h3>
              </div>
              <div className="tab-pane" id="add-comment">
                <CreateCommentView slug={slug} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Comments.propTypes = {
  isLoading: PropTypes.func,
  data: PropTypes.shape({}),
  fetchCommentsAction: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  myState: state.FetchCommentsReducer,
});

export const mapDispatchToProps = () => ({
  fetchCommentsAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(Comments);
