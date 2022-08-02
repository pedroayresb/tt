import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isSaveButtonDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    const { value } = event.target;
    const minLength = 3;
    if (value.length >= minLength) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { history } = this.props;
    this.setState({ loading: true }, () => {
      const { parentNode } = event.target.parentNode;
      const { value } = parentNode.getElementsByTagName('input')[0];
      createUser({ name: value })
        .then(() => { history.push('/search'); })
        .then(() => { this.setState({ loading: false }); });
    });
  }

  render() {
    const { isSaveButtonDisabled, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <label htmlFor="Name">
          Username:
          <input
            type="text"
            placeholder="Username"
            data-testid="login-name-input"
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.onSubmit }
            disabled={ isSaveButtonDisabled }
          >
            Entrar
          </button>
        </label>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
