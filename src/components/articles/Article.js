import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Article extends Component {
  render() {
    let articleImage;
    const {
      title,
      description,
      readtime,
      created_at: createdAt,
      author,
      image,
      slug,
      body,
    } = this.props;
    if (!image) {
      articleImage = 'https://www.mv-marchtrenk.at/files/images-sys/placeholder-news-full.png';
    } else {
      articleImage = image;
    }
    return (
      <div className="flip-box">
        <div className="flip-box-inner">
          <div className="flip-box-front">
            <Card className="home-card">
              <Card.Img variant="top" src={articleImage} className="homepage-card-image" />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>
                  <span>By </span>
                  <small className="text-muted">{ author}</small>
                  -
                  <small className="text-muted">{createdAt}</small>
                  -
                  <small className="text-muted">
                    {readtime}
                    . read
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="flip-box-back">
            <Card className="home-card">
              <Card.Body>
                <Card.Title id="card-title">{title}</Card.Title>
                <div className="flip-card-body">
                  <Card.Text>{body}</Card.Text>
                </div>
                <div>
                  <Link to={`articles/${slug}`}>
                    <Button variant="outline-primary">Read More...</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  readtime: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default Article;
