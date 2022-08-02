import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

export default class Favorites extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <Header username={ username } />
        <div data-testid="page-favorites">
          <h1>Favorites</h1>
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  username: propTypes.string.isRequired,
};
