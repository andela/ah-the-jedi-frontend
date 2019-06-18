import React, { Component } from 'react';

class Pagination extends Component {
  render() {
    const {
      handleLink, handleClick, pageNumbers, next, previous, currentPage,
    } = this.props;
    return (
      <div className="pagination">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {previous ? (
              <li className="page-item">
                <span
                  className="page-link"
                  id={previous}
                  onClick={handleLink}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </span>
              </li>
            ) : null}

            {pageNumbers.map((num, index) => (
              <li key={index} className="page-item">
                {currentPage === num ? (
                  <span id={num} className="page-link active-page" onClick={handleClick}>
                    {num}
                  </span>
                ) : (
                  <span id={num} className="page-link" onClick={handleClick}>
                    {num}
                  </span>
                )}
              </li>
            ))}

            {next ? (
              <li className="page-item">
                <span className="page-link" id={next} onClick={handleLink} aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </span>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Pagination;
