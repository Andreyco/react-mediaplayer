import React, { createClass, PropTypes } from 'react';

const wrapperStyle = {
  border: '1px solid #ccc',
  height: 10,
  boxSizing: 'border-box',
  position: 'relative',
};

const barStyle = {
  background: '#ccc',
  height: '100%',
  position: 'absolute',
};

const ProgressControl = createClass({
  contextTypes: {
    media: PropTypes.shape({
      buffered: PropTypes.instanceOf(TimeRanges),
      currentTime: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    }).isRequired,
  },

  renderBars() {
    const { buffered, currentTime, duration } = this.context.media;
    if (!currentTime || !duration || !buffered) return undefined;

    const bars = [];
    for (let i = 0; i < buffered.length; i++) {
      const left = buffered.start(i) / duration * 100;
      const width = buffered.end(i) / duration * 100 - left;
      const style = {
        left: left.toFixed(2) + '%',
        width: width.toFixed(2) + '%',
      };

      bars.push(
        <div key="range-${i}" style={{...barStyle, ...style}} />
      );
    }

    return bars;
  },

  render() {
    return (
      <div style={wrapperStyle}>
        { this.renderBars() }
      </div>
    );
  },
});

export default ProgressControl;
