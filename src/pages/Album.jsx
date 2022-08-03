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
      loading: false,
      artist: '',
      album: '',
      albumCover: '',
      musics: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const location = window.location.href;
      const id = location.split('album/')[1];
      const response = await getMusics(id);
      this.setState(
        { musics: response,
          album: response[0].collectionName,
          artist: response[0].artistName,
          albumCover: response[0].artworkUrl100,
        }, () => {
          this.setState({ loading: false });
        },
      );
    });
  }

  // handleClickBack = () => {
  //   const { history } = this.props;
  //   history.push('/search');
  // }

  render() {
    const { username } = this.props;
    const { loading, musics, album, artist, albumCover } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Header username={ username } />
        <div data-testid="page-album">
          <h1>Album</h1>
          <img src={ albumCover } alt={ album } />
          <p data-testid="album-name">{ album }</p>
          <p data-testid="artist-name">{ artist }</p>
          {musics.length > 0
            && musics.map((music, i) => <MusicCard key={ i } music={ music } />)}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  username: propTypes.string.isRequired,
  // history: propTypes.shape({
  //   push: propTypes.func.isRequired,
  // }).isRequired,
};
