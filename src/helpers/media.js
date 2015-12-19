import { isFullscreen } from './fullscreen';

export const readMetadata = (media) => ({
  currentTime: media.currentTime,
  duration: media.duration,
  fullscreen: isFullscreen(media),
  muted: media.muted,
  paused: media.paused,
  playing: !media.paused,
  volume: media.volume,
});

/**
 * Converts seconda to time in MM:SS format.
 * If hours part equals "00", it's removed.
 */
export const readableTime = (seconds) => {
  const totalSeconds = parseInt(seconds || 0, 10);
  const time = (new Date(totalSeconds * 1000))
    .toUTCString()
    .match(/(\d\d:\d\d:\d\d)/)[0]
    .split(':');

  if (time[0] === '00') time.shift();

  return time.join(':');
};
