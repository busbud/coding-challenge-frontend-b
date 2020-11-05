import React, { useEffect, useState } from 'react';
import { fetchSpotifyPlaylistTracks, fetchArtistsData } from '../api/spotify';
import { spotifyData as mockSpotifyData } from '../mocks/spotify';

function withSpotifyData(Comp) {
  const CompWrapper = (props: Props) => {
    const [spotifyData, setSpotifyData] = useState({
      isFetching: true,
      data: null,
      error: null,
      artistsData: null,
    });


    useEffect(() => {
      fetchSpotifyPlaylistTracks()
        .then((res) => res.json())
        .then((res) => {
          // NOTE: I had to do this tricky thing to catch error from spotify,
          // as it doesnt triggers the catch but an object `error: { status, message}`
          // I was missing time to integrate a Spotify token generator as it expires after 1h
          // I fallback on "backuped" mock data, but it displays an error message
          setSpotifyData(res.error ? {
            ...mockSpotifyData,
            error: res.error,
          } : {
            error: null,
            isFetching: false,
            data: res.items || null,
            artistsData: null,
          });
        });
    }, []);

    function removeDuplicates(myArr, prop) {
      return myArr.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }

    function tracksByArtists(artists = []) {
      const sorted = {};
      artists.forEach((artist) => {
        const newItem = spotifyData.data.filter((el) => {
          const artistsInTracks = el.track !== null ? el.track.artists.map((it) => it.name) : '';
          return artistsInTracks.includes(artist);
        });
        sorted[artist] = newItem;
      });
      return sorted;
    }

    const artists = spotifyData.data !== null ? removeDuplicates([...new Set(spotifyData.data
      .map((el) => (el.track !== null ? el.track.artists.map((it) => ({
        name: it.name,
        id: it.id,
      })) : '')).flat(1))], 'name') : [];


    const artistsWithTracks = tracksByArtists(artists.map((artist) => artist.name).slice(0, 50));
    const artistsIds = artists.map((artist) => artist.id).slice(0, 50).join(',');

    useEffect(() => {
      // NOTE: See note above 👆🏻
      if (artistsIds.length > 0 && spotifyData.error === null) {
        setSpotifyData({
          ...spotifyData,
          isFetching: true,
        });
        fetchArtistsData(artistsIds)
          .then((res) => res.json())
          .then((res) => {
            setSpotifyData({
              ...spotifyData,
              isFetching: false,
              artistsData: res.artists,
            });
          })
          .catch((err) => setSpotifyData({
            ...spotifyData,
            isFetching: false,
            error: err,
          }));
      }
    }, [artistsIds]); //eslint-disable-line

    return (
      <Comp
        {...props}
        artistsWithTracks={artistsWithTracks}
        spotifyData={spotifyData}
      />
    );
  };
  return CompWrapper;
}

export default withSpotifyData;
