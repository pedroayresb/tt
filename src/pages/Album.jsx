import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      musics: [],
      artist: '',
      album: '',
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favorites: favoriteSongs });
    this.setState({ loading: true }, async () => {
      const { match: { params: { id } } } = this.props;
      const response = await getMusics(id);
      this.setState({ musics: response,
        artist: response[0].artistName,
        album: response[0].collectionName,
        cover: response[0].artworkUrl100,
        favorites: favoriteSongs,
        loading: false });
    });
  }

  render() {
    const { loading, musics, artist, album, cover, favorites } = this.state;
    const filtered = musics.filter((music) => music.wrapperType !== 'collection');
    if (loading === true) {
      return (
        <div>
          <Header />
          <div data-testid="page-album">
            <Loading />
          </div>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <div data-testid="page-album">
          {musics.length > 0
          && (
            <div>
              <img src={ cover } alt={ album } />
              <p data-testid="artist-name">{artist}</p>
              <p data-testid="album-name">{album}</p>
              {filtered.map((m, i) => (<MusicCard
                key={ i }
                music={ m }
                favorites={ favorites }
              />))}
            </div>)}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
