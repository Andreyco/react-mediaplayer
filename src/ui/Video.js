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
    let video = React.findDOMNode(this);
    video.addEventListener('timeupdate', this._timeUpdate);
    video.addEventListener('progress', this._onProgress);
    video.addEventListener('loadedmetadata', this._loadedMetadata);
  },

  componentWillUnmount() {
    let video = React.findDOMNode(this);
    video.removeEventListener('timeupdate', this._timeUpdate);
    video.removeEventListener('progress', this._onProgress);
    video.removeEventListener('loadedmetadata', this._loadedMetadata);
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

  _loadedMetadata(event) {
    this.props.metadataLoaded({
      currentTime: event.target.currentTime,
      duration: event.target.duration,
    });
  },

  _timeUpdate(event) {
    this.props.currentTimeChanged(event.target.currentTime);
  },

  _onProgress(event) {
    this.props.onDownloadProgress(event.target.buffered);
  },

  render() {
    const videoProps = {
      autoPlay: this.props.autoPlay,
      width: this.props.width,
      height: this.props.height,
    };

    return (<video {...videoProps}>
      <source src={this.props.src} />
    </video>);

  },
});
