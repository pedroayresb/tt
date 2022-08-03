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
      artist: 'carregando...',
      album: 'carregando...',
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { match: { params: { id } } } = this.props;
      const response = await getMusics(id);
      this.setState({ musics: response,
        artist: response[0].artistName,
        album: response[0].collectionName,
        loading: false });
    });
  }

  // handleClickBack = () => {
  //   const { history } = this.props;
  //   history.push('/search');
  // }

  render() {
    const { loading, musics, artist, album } = this.state;
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
            && musics.map((music, i) => (<MusicCard
              key={ i }
              music={ music }
              artist={ artist }
              album={ album }
            />))}
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
