import { isFullscreen } from './fullscreen';

export const readMetadata = (media) => ({
  currentTime: media.currentTime,
  duration: media.duration,
  fullscreen: isFullscreen(media),
  paused: media.paused,
  playing: !media.paused,
});
