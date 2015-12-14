export const readMetadata = (media) => ({
  duration: media.duration,
  currentTime: media.currentTime,
  playing: !media.paused,
  paused: media.paused,
});
