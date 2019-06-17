/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Table, Button, Spinner, OverlayTrigger, Popover, Col, Row, Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  fetchReport,
  deleteReport,
  updateReport,
} from '../../redux/actions/ArticlesReportsActions';
import ModalPopUp from '../../helpers/Modal';

class UserReports extends Component {
  state = {
    id: '',
    reason: '',
  };

  componentWillMount() {
    const { fetchReport: fetchUserReports } = this.props;
    fetchUserReports();
  }

  handleClickSaveId = id => {
    this.setState({ id });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  /**
   *handles delete report by a user
   *and fetches the reports afterwards
   */
  handleDeleteReport = () => {
    const { deleteReport: deleteUserReport } = this.props;
    deleteUserReport(this.state.id);
    this.setState({ id: '' });
  };

  handleUpdate = (reason, id, articleId) => {
    const { updateReport: updateUserReport } = this.props;
    updateUserReport(id, { article: articleId, reason });
    this.setState({ reason: '' });
  };

  render() {
    const reportPopover = (
      <Popover id="popover-basic">
        <div className="container">
          <Col>
            <Row>
              <div className="col text-center">
                <p>Are you sure you want to delete this report?</p>
                <hr />
                <Button variant="primary" size="sm" className="mr-3" onClick={() => document.body.click()}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  id="delete-article-btn"
                  onClick={this.handleDeleteReport}
                >
                  Delete
                </Button>
              </div>
            </Row>
          </Col>
        </div>
      </Popover>
    );
    let userReports;

    if (this.props.reports &&
       this.props.reports.message &&
       this.props.reports.message.data
    ) {
      const { results } = this.props.reports.message.data;
      userReports = results.map((values) => (
        <tr key={values.id} id="user-reports-test">
          <td>
            <Link to={`articles/${values.reported_article.slug}`}>
              {values.reported_article.title}
            </Link>
          </td>
          <td>{values.reported_article.author.username}</td>
          <td>{moment(values.created_at).format('MMM Do YY')}</td>
          <td>
            <ModalPopUp
              btnType="outline-primary"
              trigger="view"
              article={values.reported_article.title}
              button=""
              body={values.reason}
              slug={values.reported_article.slug}
              description="Reason for Reporting"
              updateddAt={`Updated on: ${moment(values.updated_at).format('MMM Do YY')}`}
            />
          </td>
          <td>
            <ModalPopUp
              btnType="outline-secondary"
              trigger="update"
              article={values.reported_article.title}
              button={(
                <Button
                  variant="outline-primary"
                  disabled={
                  !this.state.reason.match(/([^\s])/)
                }
                  onClick={() => this.handleUpdate(
                    this.state.reason.toLowerCase(),
                    values.id,
                    values.reported_article.id,
                  )
                  }
                >
                  Update
                </Button>
)}
              slug={values.reported_article.slug}
              description="Update Report"
              body={(
                <Form>
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      className="reason"
                      id="reason"
                      onChange={this.handleChange}
                      defaultValue={values.reason}
                    />
                  </Form.Group>
                  <Form.Text className="text-muted" id="report-error" />
                </Form>
)}
            />
          </td>
          <td>
            <OverlayTrigger trigger="click" placement="left" overlay={reportPopover} rootClose>
              <Button variant="outline-danger" onClick={() => this.handleClickSaveId(values.id)}>
                Delete report
              </Button>
            </OverlayTrigger>
          </td>
        </tr>
      ));
    } else if (this.props.reports.isLoading) {
      userReports = (
        <div className="text-center" id="no-user-reports">
          <span>Loading reports...</span>
          <Spinner animation="grow" variant="primary" />
        </div>
      );
    } else {
      userReports = <div className="ml-5">No reports to display</div>;
    }
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Reported Article</th>
            <th>Author</th>
            <th>Date Created</th>
            <th>Actions</th>
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{userReports}</tbody>
      </Table>
    );
  }
}

export const mapStateToProps = state => ({
  reports: state.ReportsReducer,
});

export const mapDispatchToProps = () => ({
  fetchReport,
  deleteReport,
  updateReport,
});

UserReports.defaultProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(UserReports);
