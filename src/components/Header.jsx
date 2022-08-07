import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
    };
    this.getUsername = this.getUsername.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await this.getUsername();
      this.setState({ username: user.name, loading: false });
    });
  }

  async getUsername() {
    return getUser();
  }

  render() {
    const { loading, username } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">
          <p data-testid="header-user-name">{ username }</p>
        </Link>
      </header>
    );
  }
}
