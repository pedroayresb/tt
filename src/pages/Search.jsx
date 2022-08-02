import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <Header username={ username } />
        <div data-testid="page-search">
          <h1>Search</h1>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  username: propTypes.string.isRequired,
};
