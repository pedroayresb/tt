import React, { Component } from 'react';
import propTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.music.trackId,
    };
    this.addFavorite = this.addFavorite.bind(this);
  }

  async componentDidMount() {
    const { music, favorites } = this.props;
    const { id } = this.state;
    const { trackId } = music;
    const is = favorites.some((song) => song.trackId === trackId);
    this.setState({ isChecked: is });
    console.log(id);
  }

  async addFavorite(event) {
    const { id } = this.state;
    this.setState({ loading: true }, async () => {
      if (event.target.checked === true) {
        const response = await getMusics(id);
        await addSong(response[0]);
        this.setState({ isChecked: true, loading: false });
      } else {
        const response = await getMusics(id);
        await removeSong(response[0]);
        this.setState({ isChecked: false, loading: false });
      }
    });
  }

  render() {
    const { music, removeFavorite } = this.props;
    const { isChecked, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (music.previewUrl === undefined) {
      return null;
    }
    if (removeFavorite !== undefined) {
      return (
        <div className="music-card">
          <h1>{ music.trackName }</h1>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label
            htmlFor="audio-component"
            id={ music.trackId }
          >
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${music.trackId}` }
              onChange={ removeFavorite }
              checked={ isChecked }
              id="audio-component"
            />
          </label>
        </div>
      );
    }
    return (
      <div className="music-card">
        <h1>{ music.trackName }</h1>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label
          htmlFor="audio-component"
        >
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${music.trackId}` }
            onChange={ this.addFavorite }
            checked={ isChecked }
            id={ music.trackId }
          />
        </label>
      </div>
    );
  }
}
MusicCard.defaultProps = {
  removeFavorite: undefined,
};

MusicCard.propTypes = {
  music: propTypes.shape({
    wrapperType: propTypes.string.isRequired,
    trackName: propTypes.string.isRequired,
    previewUrl: propTypes.string.isRequired,
    trackId: propTypes.number.isRequired,
  }).isRequired,
  favorites: propTypes.arrayOf(propTypes.shape({
    some: propTypes.func,
  }).isRequired).isRequired,
  removeFavorite: propTypes.func,
};
