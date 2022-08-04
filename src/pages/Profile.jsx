import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: {
        name: '',
        email: '',
        description: '',
        image: '',
      },
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ user, loading: false });
    });
  }

  render() {
    const { loading, user } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <div data-testid="page-profile">
          <h1>Profile</h1>
          <img src={ user.image } alt={ user.name } />
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.description}</p>
        </div>
      </div>
    );
  }
}
