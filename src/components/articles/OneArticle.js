import React, { Component } from 'react';
import {
  Image, Row, Col, Button, Popover, OverlayTrigger,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

class OneArticle extends Component {
  render() {
    let Chevron;
    const {
      title, description, readtime, author, image, body, handleClick,
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
                <Col sm={2}>Icons here; I.e liking, bookmarking etc</Col>

                <Col sm={10} className="body-text read-one-image">
                  {parse(body)}
                </Col>
              </Row>
            </div>
          </div>
          <hr />
          <p>comment section</p>
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
};

export default OneArticle;
