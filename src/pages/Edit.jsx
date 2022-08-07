import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Edit extends Component {
  state = {
    loading: false,
    isSaveButtonDisabled: true,
    name: '',
    email: '',
    description: '',
    image: '',
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      const { name, email, description, image } = user;
      this.setState({ loading: false, name, email, description, image });
    });
  }

  validation = () => {
    const { name, email, description, image } = this.state;
    const array = [name, email, description, image];
    return array.some((input) => input === '');
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.setState({ isSaveButtonDisabled: this.validation() });
    });
  }

  onSubmit = () => {
    this.setState({ loading: true }, async () => {
      const { history } = this.props;
      const { name, email, description, image } = this.state;
      await updateUser({ name, email, description, image });
      history.push('/profile');
    });
  }

  render() {
    const { name, email, description, image, loading, isSaveButtonDisabled } = this.state;
    const { onInputChange, onSubmit } = this;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="edit-name">
                Nome
                <input
                  type="text"
                  id="edit-name"
                  data-testid="edit-input-name"
                  name="name"
                  value={ name }
                  onChange={ onInputChange }
                />
              </label>
              <label htmlFor="edit-email">
                E-mail
                <input
                  type="email"
                  data-testid="edit-input-email"
                  id="edit-email"
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                />
              </label>
              <label htmlFor="edit-description">
                Descricao
                <textarea
                  type="text"
                  data-testid="edit-input-description"
                  name="description"
                  id="edit-description"
                  value={ description }
                  onChange={ onInputChange }
                />
              </label>
              <label htmlFor="edit-image">
                Image
                <input
                  type="text"
                  data-testid="edit-input-image"
                  name="image"
                  id="edit-image"
                  value={ image }
                  onChange={ onInputChange }
                />
              </label>
              <button
                type="submit"
                onClick={ onSubmit }
                disabled={ isSaveButtonDisabled }
                data-testid="edit-button-save"
              >
                Editar perfil
              </button>
            </form>
          )}
      </div>
    );
  }
}

Edit.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};
