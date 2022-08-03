import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { music, artist, album } = this.props;
    if (music.wrapperType === 'collection') {
      return (
        <div>
          <p data-testid="artist-name">{artist}</p>
          <p data-testid="album-name">{album}</p>
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: propTypes.shape({
    wrapperType: propTypes.string.isRequired,
    trackName: propTypes.string.isRequired,
    previewUrl: propTypes.string.isRequired,
  }).isRequired,
  artist: propTypes.string.isRequired,
  album: propTypes.string.isRequired,
};
