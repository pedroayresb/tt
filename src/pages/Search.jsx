import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isSaveButtonDisabled: true,
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const { value } = event.target;
    const minLength = 2;
    if (value.length >= minLength) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  render() {
    const { username } = this.props;
    const { isSaveButtonDisabled } = this.state;
    return (
      <div>
        <Header username={ username } />
        <div data-testid="page-search">
          <form>
            <label htmlFor="artist">
              Digite o(s) nome(s) do(s) artista(s)
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isSaveButtonDisabled }
              >
                Pesquisar
              </button>
            </label>
          </form>
        </div>
      </div>
    );
  }
}
Search.propTypes = {
  username: propTypes.string.isRequired,
};
