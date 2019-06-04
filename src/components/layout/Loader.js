/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import '../../assets/styles/loader.scss';

/*
 * Loader Component
 *
 *@return {jsx}
 */

export class Loader extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="container">
            <div className="row">
              <a className="intro-banner-vdo-play-btn blue-bg" target="_blank">
                <i className="glyphicon glyphicon-play whiteText" aria-hidden="true" />
                <span className="ripple blue-bg" />
                <span className="ripple blue-bg" />
                <span className="ripple blue-bg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;
