import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      isSaveButtonDisabled: true,
      loading: false,
      artistAlbums: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(event) {
    event.preventDefault();
    const { value } = event.target.parentNode.getElementsByTagName('input')[0];
    this.setState({ artist: ` ${value}` }, () => {
      event.target.parentNode.getElementsByTagName('input')[0].value = '';
      this.setState({ loading: true }, async () => {
        const artistAlbums = await searchAlbumsAPI(value);
        this.setState({ artistAlbums }, () => {
          this.setState({ loading: false });
        });
      });
    });
  }

  render() {
    const { isSaveButtonDisabled, loading, artistAlbums, artist } = this.state;

    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form>
            <label htmlFor="artist">
              Digite o nome do artista:
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                onClick={ this.onSubmit }
                disabled={ isSaveButtonDisabled }
              >
                Pesquisar
              </button>
            </label>
          </form>
        </div>
        <div>
          {loading && <Loading />}
          {!loading && artistAlbums.length > 0 && (
            <div className="results-container">
              <p>
                Resultado de álbuns de:
                {artist}
              </p>
              <div className="results">
                {artistAlbums.map((album, i) => (
                  <div key={ i } className="result">
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                      <p>{ album.collectionName }</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!loading && artistAlbums.length === 0 && (
            <div className="results-container">
              <p>
                Nenhum álbum foi encontrado
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
