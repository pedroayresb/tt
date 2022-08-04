import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
    };
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({ favorites, loading: false });
    });
  }

  removeFavorite(event) {
    this.setState({ loading: true }, async () => {
      const { id } = event.target;
      const favorites = await getFavoriteSongs();
      const is = favoriteSongs.some((song) => song.trackId === trackId);
      this.setState({ favorites, loading: false });
    });
  }

  render() {
    const { favorites, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <div data-testid="page-favorites">
          <h1>Favorites</h1>
          {favorites.map((m, i) => (<MusicCard
            key={ i }
            music={ m }
            addSong={ this.removeFavorite }
          />))}
        </div>
      </div>
    );
  }
}
