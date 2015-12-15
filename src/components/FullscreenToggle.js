import React, { PropTypes } from 'react';

const FullscreenToggle = (
  {},
  { media }
) => (
  <div onClick={media.toggleFullscreen}>{media.fullscreen ? 'Exit' : 'Enter'}</div>
);

FullscreenToggle.contextTypes = {
  media: PropTypes.shape({
    fullscreen: PropTypes.bool.isRequired,
    toggleFullscreen: PropTypes.func.isRequired,
  }).isRequired,
};

export default FullscreenToggle;
