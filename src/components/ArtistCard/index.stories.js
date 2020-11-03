import React from 'react';
import { storyWithThemeToggle } from '../../context/ThemeProvider/storyWithThemeToggle';

import ArtistCard from './index';

const mockArtist = {
  external_urls: {
    spotify: 'https://open.spotify.com/artist/3sS9RKjrDJMl7zpG3cWHk7',
  },
  followers: {
    href: null,
    total: 18700,
  },
  genres: [
    'dubstep',
    'gaming dubstep',
    'riddim dubstep',
  ],
  href: 'https://api.spotify.com/v1/artists/3sS9RKjrDJMl7zpG3cWHk7',
  id: '3sS9RKjrDJMl7zpG3cWHk7',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/35546027fa6997d5409f39b2454c8820c4e312f3',
      width: 640,
    },
    {
      height: 320,
      url: 'https://i.scdn.co/image/c3659a65af87ebf274530ed8710ae4ce3b842940',
      width: 320,
    },
    {
      height: 160,
      url: 'https://i.scdn.co/image/ca661a980cd6194b3ff14eb831c3e02385265f3c',
      width: 160,
    },
  ],
  name: 'Aweminus',
  popularity: 40,
  type: 'artist',
  uri: 'spotify:artist:3sS9RKjrDJMl7zpG3cWHk7',
};

export default {
  title: 'ArtistCard',
  component: ArtistCard,
  decorators: [storyWithThemeToggle],
};

export const BasicUsage = () => (
  <ArtistCard
    artistName={mockArtist.name}
    imgUrl={mockArtist.images[0].url}
    audioUrl="https://p.scdn.co/mp3-preview/06f8a4dfecbf93976b966dd71fdb5c25fd651855?cid=774b29d4f13844c495f206cafdad9c86"
    id={mockArtist.id}
    spotifyUrl={mockArtist.external_urls.spotify}
    style={{ width: '300px', height: '300px' }}
  />
);
