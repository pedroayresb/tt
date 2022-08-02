import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

export default class Edit extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <Header username={ username } />
        <div data-testid="page-profile-edit">
          <h1>Edit</h1>
        </div>
      </div>
    );
  }
}

Edit.propTypes = {
  username: propTypes.string.isRequired,
};
