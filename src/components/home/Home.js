import React, { Component } from 'react';
import { displayMessage } from '../../helpers'


export class Home extends Component {

  onClick = event => {
    console.log('CLICKED');
    event.preventDefault();
    displayMessage('Message');
  };

  render() {
    return (
      <div>
        <h1>Welcome to Author's Haven</h1>
        <button onClick={this.onClick}>Click</button>
      </div>
    );
  }
}

export default Home;
