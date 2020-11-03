import { useState, useEffect } from 'react';

export const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState({
    isPlaying: false,
    duration: audio.duration,
  });

  const toggle = () => setPlaying({
    isPlaying: !playing.isPlaying,
    duration: audio.duration,
  });

  useEffect(() => {
    if (playing.isPlaying) {
      audio.play();
    } else audio.pause();
  },
[playing]); // eslint-disable-line

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying({
      isPlaying: false,
      duration: audio.duration,
    }));
    return () => {
      audio.removeEventListener('ended', () => setPlaying({
        isPlaying: false,
        duration: audio.duration,
      }));
    };
    }, []);// eslint-disable-line

  return [playing, toggle];
};

export default useAudio;
