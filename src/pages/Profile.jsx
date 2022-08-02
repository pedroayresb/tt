import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <Header username={ username } />
        <div data-testid="page-profile">
          <h1>{username}</h1>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  username: propTypes.string.isRequired,
};
