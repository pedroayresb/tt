import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { username } = this.props;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/album/:">Albums</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">
          <p data-testid="header-user-name">{ username }</p>
          <Link to="/profile/edit">Edit</Link>
        </Link>
      </header>
    );
  }
}

Header.propTypes = {
  username: propTypes.string.isRequired,
};
