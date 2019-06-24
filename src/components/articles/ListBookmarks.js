import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../../assets/styles/searchComponent.scss';
import '../../assets/styles/profile.scss';
import avatar from '../../assets/images/avatar.png';

/*
* Articles search Component
* Display articles that contain keyword searched
*@return {jsx}
*/
class ListBookmarks extends Component {
  render() {
    const { value } = this.props;
    const {
      slug,
      title,
      bookmarked_at: updatedAt,
      image,
      author,
      description,
      id,
    } = value;
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateFormat = new Date(updatedAt).toLocaleString('en-US', options);
    return (
      <Card className="url">
        <div className="article" key={id}>
          <div className="container-fluid">
            <div className="row">
              <div className={image === '' ? 'hidden ' : 'col-sm-2 col-md-4'}>
                <Card.Img src={image} alt="article-image" className="article-image" />
              </div>
              <div className={image === '' ? 'col-sm-12 col-md-12' : 'col-sm-4 col-md-8'}>
                <div className="col-md-12 col-xs-12">
                  <div className="media">
                    <div className="row">
                      <div className="col-sm-3">
                        <img src={avatar} alt="Avatar" className="avatar" />
                      </div>
                      <div className="col-sm-9">
                        <a href={`/@${author}`} className="name">
                          {author}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <h2>{title}</h2>
                  </div>
                  <div className="row">
                    <div className="wrapper mt-2">
                      <p className="article-body">{description}</p>
                      <a href={`articles/${slug}`} className="read-more">
                        Read more....
                      </a>
                    </div>
                    <small className="text-muted mt-2">
                      Last updated &nbsp;
                      {dateFormat}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

ListBookmarks.propTypes = {
  value: PropTypes.shape({}),
};

ListBookmarks.defaultProps = {
  value: {},
};

export default ListBookmarks;
