import React, { createClass, PropTypes } from 'react';
import Source from './Source';

const Video = createClass({
  propTypes: {
    autoPlay: PropTypes.bool,
    controls: PropTypes.bool,
    src: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string,
      })
    ).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  },

  render() {
    const { src, width, height, controls, autoPlay } = this.props;
    return (
      <video {...{ width, height, controls, autoPlay }}>
        { src.map((props, key) => <Source key={key} {...props} />) }
      </video>
    );
  },
});

export default Video;
