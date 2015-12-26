import React, { PropTypes } from 'react';
import InputRange from './InputRange';

const VolumeControl = (
  {},
  { media }
) => {
  const volumeLink = {
    value: media.muted ? 0 : media.volume,
    requestChange: value => media.setVolume(value),
  };

  return (
    <div>
      <div onClick={media.toggleMute}>{ (media.muted || !media.volume) ? 'Unmute' : 'Mute'}</div>
      <InputRange
        min={0}
        max={1}
        step={0.01}
        onInput={value => media.setVolume(value)}
        valueLink={volumeLink}
      />
    </div>
  );
};

VolumeControl.contextTypes = {
  media: PropTypes.shape({
    volume: PropTypes.number.isRequired,
    muted: PropTypes.bool.isRequired,
    setVolume: PropTypes.func.isRequired,
    toggleMute: PropTypes.func.isRequired,
  }).isRequired,
};

export default VolumeControl;
