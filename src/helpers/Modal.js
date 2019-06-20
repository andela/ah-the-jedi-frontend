import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import {
  Modal,
  Button,
} from 'react-bootstrap';

class ModalPopUp extends Component {
  state = {
    show: false,
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    const {
      button, body, article, slug, description, trigger, btnType, updateddAt,
    } = this.props;
    const { show } = this.state;
    return (
      <div>
        <Button variant={btnType} onClick={this.handleShow} id="modal-show-btn">
          {trigger}
        </Button>
        <Modal show={show} onHide={this.handleClose} centered id="modal-popup">
          <Modal.Header closeButton>
            <Modal.Title className="reports-title">
              <span>My report on: </span>
              <Link to={`articles/${slug}`}>{article}</Link>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span className="reason-title">{description}</span>
            <br />
            {body}
          </Modal.Body>
          <small>
            <span>
              {updateddAt}
            </span>
          </small>
          <Modal.Footer>
            {button}
            <Button variant="outline-secondary" onClick={this.handleClose} id="close-modal-popup">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalPopUp.propTypes = {
  article: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  trigger: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  btnType: PropTypes.string.isRequired,
  updateddAt: PropTypes.string,
};

ModalPopUp.defaultProps = {
  updateddAt: '',
};

export default ModalPopUp;
