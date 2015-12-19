import React, { PropTypes } from 'react';

const VolumeControl = (
  {},
  { media }
) => {
  return (
    <div>
      volume { media.volume }<br/>
      <div onClick={media.toggleMute}>{ media.muted ? 'Unmute' : 'Mute'}</div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={media.muted ? 0 : media.volume}
        onChange={(evt) => media.setVolume(parseFloat(evt.target.value))}
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
