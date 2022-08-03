import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import propTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import Album from '../pages/Album';
import Edit from '../pages/Edit';
import Favorites from '../pages/Favorites';
// import NotFound from '../pages/NotFound';

export default class Content extends Component {
  constructor() {
    super();
    this.getUsername = this.getUsername.bind(this);
    this.state = {
      user: '',
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      await this.getUsername();
      this.setState({ loading: false });
    });
  }

  async getUsername() {
    const user = await getUser();
    this.setState({ user: user.name }, () => this.setState({ loading: false }));
  }

  render() {
    const { user, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <main className="Content">
        <Switch>
          <div className="container">
            <Route
              exact
              path="/"
              component={ Login }
            />
            <Route
              exact
              path="/search"
              component={ () => <Search username={ user } /> }
            />
            <Route
              exact
              path="/album/:id"
              component={ () => <Album username={ user } /> }
            />
            <Route
              exact
              path="/favorites"
              component={ () => <Favorites username={ user } /> }
            />
            <Route
              exact
              path="/profile"
              component={ () => <Profile username={ user } /> }
            />
            <Route
              exact
              path="/profile/edit"
              component={ () => <Edit username={ user } /> }
            />
          </div>
        </Switch>
      </main>
    );
  }
}

Content.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
