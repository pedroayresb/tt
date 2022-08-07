import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class Edit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isSaveButtonDisabled: true,
    };
    this.validation = this.validation.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name, email, description, image } = user;
      this.setState({ name, email, description, image, loading: false });
    });
  }

  onInputChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      this.setState({ isSaveButtonDisabled: this.validation() });
    });
  }

  onSubmit() {
    this.setState({ loading: true }, async () => {
      const { history } = this.props;
      const { name, email, description, image } = this.state;
      await updateUser({ name, email, description, image });
      history.push('/profile');
    });
  }

  validation() {
    const { name, email, description, image } = this.state;
    const array = [name, email, description, image];
    return array.some((input) => input === '');
  }

  render() {
    const { name, email, description, image, loading, isSaveButtonDisabled } = this.state;
    if (loading) {
      return (
        <div data-testid="page-profile-edit">
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <input
            type="text"
            data-testid="edit-input-name"
            name="name"
            value={ name }
            onChange={ this.onInputChange }
          />
          <input
            type="email"
            data-testid="edit-input-email"
            name="email"
            value={ email }
            onChange={ this.onInputChange }
          />
          <input
            type="text"
            data-testid="edit-input-description"
            name="description"
            value={ description }
            onChange={ this.onInputChange }
          />
          <input
            type="text"
            data-testid="edit-input-image"
            name="image"
            value={ image }
            onChange={ this.onInputChange }
          />
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ isSaveButtonDisabled }
            onClick={ this.onSubmit }
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

Edit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
