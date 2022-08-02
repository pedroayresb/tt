import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

export default class Album extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <Header username={ username } />
        <div data-testid="page-album">
          <h1>Album</h1>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  username: propTypes.string.isRequired,
};
