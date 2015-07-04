"use strict";

import React from 'react';
let { PropTypes } = React;

module.exports = React.createClass({

  displayName: 'Video',

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

  shouldComponentUpdate(nextProps) {
    if (
      this.props.width !== nextProps.width ||
      this.props.height !== nextProps.height ||
      this.props.src !== nextProps.src
    ) {
      return true;
    }
    return false;
  },

  render() {
    const videoProps = {
      autoPlay: this.props.autoPlay,
      width: this.props.width,
      height: this.props.height,
    };

    return (<video ref="video" {...videoProps}>
      <source src={this.props.src} />
    </video>);

  },
});
