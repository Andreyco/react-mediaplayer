import React, { PropTypes } from 'react';

const PlaybackToggle = (
  {},
  { media }
) => (
  <div onClick={media.togglePlayback}>{media.playing ? 'Stop' : 'Play'}</div>
);

PlaybackToggle.contextTypes = {
  media: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    togglePlayback: PropTypes.func.isRequired,
  }).isRequired,
};

export default PlaybackToggle;
