import config from '../config';

const API = config.APIs.spotify.api;
const TOKEN = config.APIs.spotify.token;

export function fetchSpotifyPlaylistTracks() {
  return fetch(`${API}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: TOKEN,
    },
  });
}

export function fetchArtistsData(ids) {
  return fetch(`https://api.spotify.com/v1/artists?ids=${ids}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: TOKEN,
    },
  });
}

export default fetchSpotifyPlaylistTracks;
