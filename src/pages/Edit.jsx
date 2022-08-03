import React, { Component } from 'react';
import Header from '../components/Header';

export default class Edit extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>Edit</h1>
        </div>
      </div>
    );
  }
}
