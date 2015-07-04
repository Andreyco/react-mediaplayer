"use strict";

import React from 'react';
let { PropTypes } = React;

let Video = React.createClass({

  propTypes: {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    currentTimeChanged: PropTypes.func,
    durationChanged: PropTypes.func,
  },

  componentDidMount() {
    let video = React.findDOMNode(this.refs.video);
    video.addEventListener('timeupdate', this.props.currentTimeChanged);
    video.addEventListener('durationchange', this.props.durationChanged);
    video.addEventListener('progress', this.props.onProgress);
    video.addEventListener('ended', this.props.onEnd);
  },

  componentWillUnmount() {
    let video = React.findDOMNode(this.refs.video);
    video.removeEventListener('timeupdate', this.props.currentTimeChanged);
    video.removeEventListener('durationchange', this.props.durationChanged);
    video.removeEventListener('progress', this.props.onProgress);
    video.removeEventListener('ended', this.props.onEnd);
  },

  render() {
    let { src, width, height, currentTimeChanged, durationChanged, ...restProps} = this.props;

    return (<video ref="video" {...restProps}
      width={width} height={height}
      timeupdate={currentTimeChanged}
      durationchange={durationChanged}
    >
      <source src={src} />
    </video>);
  },
});

module.exports = Video;
