import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Album from './pages/Album';
import Edit from './pages/Edit';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/search"
          component={ Search }
        />
        <Route
          exact
          path="/album/:id"
          component={ Album }
        />
        <Route
          exact
          path="/favorites"
          component={ Favorites }
        />
        <Route
          exact
          path="/profile"
          component={ Profile }
        />
        <Route
          exact
          path="/profile/edit"
          component={ Edit }
        />
        <Route
          exact
          path="/*"
          component={ NotFound }
        />
      </Switch>
    );
  }
}

export default App;
