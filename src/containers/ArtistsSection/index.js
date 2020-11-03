import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionWrapper, ArtistsWrapper } from './styledComponent';
import { makeLazy } from '../../utils/makeLazy';
import withSpotify from '../../context/WithSpotify';
import { LazyArtist } from '../../components/ArtistCard/styledComponent';
import Banner from '../../components/Banner';

type Props = {
    spotifyData: Object,
    artistsWithTracks: Object,
}

function ArtistsSection(props: Props) {
  const {
    spotifyData,
    artistsWithTracks,
  } = props;
  const { t } = useTranslation();

  const ArtistCard = makeLazy(() => import('../../components/ArtistCard'), <LazyArtist />);
  return (
    <SectionWrapper>
      {spotifyData.error && (
        <Banner
          title="Spotify Error"
          content={`Oooops "${spotifyData.error.message}" 😅🤷🏻`}
          closable
        />
      )}
      <h1>{t('artists_section_title')}</h1>
      <ArtistsWrapper>
        {spotifyData.artistsData !== null && spotifyData.artistsData.map((artist) => {
          return (
            <ArtistCard
              key={artist.id}
              artistName={artist.name}
              audioUrl={
                  // NOTE: always take the last track to add more randomness.
                  // With the first track from an artist and another in a playlist
                  // there's more chances that it will be the same track
                artistsWithTracks[artist.name][artistsWithTracks[artist.name].length - 1]
                  .track.preview_url
                }
              spotifyUrl={artist.external_urls.spotify}
              imgUrl={artist.images[0] && artist.images[0].url}
            />
          );
        })}
      </ArtistsWrapper>
      <h2>{t('artists_section_footer_title')}</h2>
    </SectionWrapper>
  );
}

export default withSpotify(ArtistsSection);
