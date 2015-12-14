import React, { createClass, PropTypes } from 'react';
import Source from './Source';

const Video = createClass({
  propTypes: {
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
        { this.props.src.map((src, key) => <Source key={key} {...src} />) }
      </video>
    );
  }
});

export default Video;
