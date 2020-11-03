import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { useAudio } from '../../hooks/useAudio';
import useInterval from '../../hooks/useInterval';
import { ReactComponent as PlayBackground } from '../../assets/images/play-background.svg';
import { ReactComponent as PlayIcon } from '../../assets/images/play-icon.svg';
import { ReactComponent as PauseIcon } from '../../assets/images/pause-icon.svg';
import { ReactComponent as SpotiyIcon } from '../../assets/images/spotify-icon.svg';

import {
  CardWrapper,
  PlayButton,
  PlayPauseWrapper,
  Link,
  ArtistWrapper,
} from './styledComponent';

type Props = {
    audioUrl: String,
    imgUrl:String,
    artistName: String,
    spotifyUrl: String,
    style?: Object,
}


function ArtistCard(
  props: Props
) {
  const {
    audioUrl,
    imgUrl,
    artistName,
    spotifyUrl,
    style,
  } = props;

  const [playing, toggle] = useAudio(audioUrl);
  const [currentTime, setCurrentTime] = useState(0);
  const { t } = useTranslation();

  useInterval(() => {
    const percentagePlayed = ((currentTime / playing.duration) * 100).toFixed(0);
    if (playing.isPlaying && percentagePlayed <= 99) {
      setCurrentTime(currentTime + 1);
    }
    if (percentagePlayed >= 99) {
      setCurrentTime(0);
    }
  }, 1000);

  return (
    <CardWrapper
      style={style}
      onClick={() => { if (isMobile) window.open(spotifyUrl, '_blank'); }}
      isPlaying={playing.isPlaying}
      duration={playing.duration}
      isMobile={isMobile}
    >
      <>
        <ArtistWrapper>
          <p>
            {artistName}
          </p>
          <Link href={spotifyUrl} target="_blank">
            <SpotiyIcon />
            {t('listen_on_spotify')}
          </Link>
        </ArtistWrapper>
        {!isMobile && (
          <PlayButton
            onClick={(e) => { e.preventDefault(); toggle(); }}
            strokeDashArray={((currentTime / playing.duration) * 160).toFixed(0)}
          >
            <PlayPauseWrapper>
              {playing.isPlaying ? (
                <PauseIcon className="playPause" />
              ) : (
                <PlayIcon className="playPause" />
              )}
            </PlayPauseWrapper>
            <PlayBackground
              className="playBackground"
            />
            {playing.isPlaying ? 'Pause' : 'Play'}
          </PlayButton>
        )}

        {imgUrl && (
          <img
            src={imgUrl}
            alt={artistName}
          />
        )}
      </>
    </CardWrapper>
  );
}

ArtistCard.defaultProps = {
  style: {},
};

export default ArtistCard;
