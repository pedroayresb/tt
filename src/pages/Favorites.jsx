import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      hasFavorite: false,
    };
    this.removeFavorite = this.removeFavorite.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favorites = await getFavoriteSongs();
      this.setState({ favorites, loading: false }, () => {
        if (favorites.length > 0) {
          this.setState({ hasFavorite: true });
        }
      });
    });
  }

  async removeFavorite(event) {
    this.setState({ loading: true }, async () => {
      const { id } = event.target.parentNode;
      const favorites = await getFavoriteSongs();
      if (favorites.length > 0) {
        const target = favorites.filter((song) => song.trackId === Number(id));
        await removeSong(target[0]);
        const favorite = await getFavoriteSongs();
        this.setState({ favorites: favorite, loading: false });
      } else if (favorites.length === 0) {
        this.setState({ loading: false, hasFavorite: false });
      }
    });
  }

  render() {
    const { favorites, loading, hasFavorite } = this.state;
    if (loading) {
      return (
        <div data-testid="page-favorites">
          <Header />
          <Loading />
        </div>
      );
    }
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>
        { hasFavorite ? (
          !loading && favorites.map((m, i) => (<MusicCard
            key={ i }
            music={ m }
            favorites={ favorites }
            removeFavorite={ this.removeFavorite }
            { ...loading && <Loading /> }
          />))
        ) : (
          <p>You have no favorites</p>
        )}
      </div>
    );
  }
}
