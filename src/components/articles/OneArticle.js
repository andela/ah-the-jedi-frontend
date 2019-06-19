import React, { Component } from 'react';
import {
  Image, Row, Col, Button, Popover, OverlayTrigger,
} from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import { twitterUrl, facebookUrl, mailUrl } from '../../helpers/socialShare';
import Comments from '../comments/Comments';
import Bookmarks from './Bookmark';

class OneArticle extends Component {
  render() {
    const { bookmarks } = this.props;

    let Chevron;
    const {
      title, description, readtime, author, image, body, handleClick, slug, tags
    } = this.props;
    const popover = (
      <Popover id="popover-basic">
        <OverlayTrigger
          trigger="click"
          placement="left"
          overlay={(
            <Popover id="popover-basic">
              <div className="container">
                <Col>
                  <Row>
                    <div className="col text-center">
                      <p>Are you sure you want to delete this article?</p>
                      <hr />
                      <Button variant="primary" size="sm" className="mr-3">
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        id="delete-article-btn"
                        onClick={handleClick}
                      >
                        Delete
                      </Button>
                    </div>
                  </Row>
                </Col>
              </div>
            </Popover>
)}
          rootClose
        >
          <Button variant="outline-danger" size="sm">
            Delete Article
          </Button>
        </OverlayTrigger>
        <br />
        <br />
        <Link to={`update/${slug}`}>
          <Button variant="primary" id="update-button" size="sm">
            Update Article
          </Button>
        </Link>
      </Popover>
    );

    /** get the username if any of logged in user and return empty of none */
    const username = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).username
      : '';
    /** check if owner of profile is one logged in and display edit chevron else display none */
    if (username === author) {
      Chevron = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
          <span className="mdi mdi-dots-vertical pull-right hamburger-menu" />
        </OverlayTrigger>
      );
    } else {
      Chevron = () => '';
    }

    return (
      <div className="container-fluid">
        <Row>
          <Col sm={12}>
            <br />
            <div className="pull-right user-view-one">
              <NavLink to={`/@${author}`}>
                <span id="user-name">{author}</span>
                <Button variant="primary" size="lg" className="profile-btn">
                  {author.substring(0, 2)}
                </Button>
              </NavLink>
              <span className="one-menu">
                <Chevron />
              </span>
            </div>
          </Col>
        </Row>
        <div className="container">
          <Row>
            <Col sm={12}>
              <h1>{title}</h1>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <span className="mdi mdi-clock-outline mr-5">
                {readtime}
                read
              </span>
              <span className="mdi mdi-eye-outline md-18"> 5</span>
              <br />
              <br />
              <p className="description-text">{description}</p>
            </Col>
          </Row>
          <div className="container">
            <Image src={image} fluid rounded className="image-place" />
            <br />
            <br />
            <div>
              <Row>
                <Col sm={2}>
                  <Bookmarks slug={slug} bookmarks={bookmarks} />
                </Col>

                <Col sm={10} className="body-text read-one-image">
                  {parse(body)}
                </Col>
              </Row>
              <div className="socialShare">
                <a href={facebookUrl(slug, title)} target="_blank">
                  <img
                    className="socialShare-facebook"
                    src="https://res.cloudinary.com/do8v0ew77/image/upload/v1560759898/icons8-facebook-filled-100_c16cmr.png"
                    title="Facebook"
                    alt="facebook"
                  />
                </a>
                <a href={twitterUrl(slug, title)} target="_blank">
                  <img
                    className="socialShare-twitter"
                    src="https://res.cloudinary.com/do8v0ew77/image/upload/v1560759897/icons8-twitter-circled-filled-100_osi7la.png"
                    title="Twitter"
                    alt="twitter"
                  />
                </a>
                <a href={mailUrl(slug, title)} target="_blank">
                  <img
                    className="socialShare-mail"
                    src="https://res.cloudinary.com/do8v0ew77/image/upload/v1560759963/email_k2vitj.png"
                    title="Mail"
                    alt="mail"
                  />
                </a>
              </div>
            </div>
          </div>
          <hr />
          {tags.map(tag => <button type="button" className="btn btn-outline-secondary tag-button">{tag}</button>)}
          <hr />
          {' '}
          <Comments slug={slug} />
        </div>
      </div>
    );
  }
}

OneArticle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  readtime: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  slug: PropTypes.string.isRequired,
  bookmarks: PropTypes.arrayOf(PropTypes.shape({})),
};

OneArticle.defaultProps = {
  bookmarks: [{}],
};

export default OneArticle;
