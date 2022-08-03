import React, { Component } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

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

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { match: { params: { id } } } = this.props;
      const response = await getMusics(id);
      this.setState({ musics: response,
        artist: response[0].artistName,
        album: response[0].collectionName,
        cover: response[0].artworkUrl100,
        loading: false });
    });
  }

  // handleClickBack = () => {
  //   const { history } = this.props;
  //   history.push('/search');
  // }

  render() {
    const { loading, musics, artist, album, cover } = this.state;
    const filtered = musics.filter((music) => music.wrapperType !== 'collection');
    console.log(musics);
    console.log(filtered);
    if (loading === true) {
      return (
        <div data-testid="page-album">
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        {musics.length > 0
          && (
            <div>
              <img src={ cover } alt={ album } />
              <p data-testid="artist-name">{artist}</p>
              <p data-testid="album-name">{album}</p>
              {filtered.map((m, i) => (<MusicCard
                key={ i }
                music={ m }
              />))}
            </div>)}
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
  // history: propTypes.shape({
  //   push: propTypes.func.isRequired,
  // }).isRequired,
};
