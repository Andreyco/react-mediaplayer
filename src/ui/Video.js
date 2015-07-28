"use strict";

import React from 'react';
const { PropTypes } = React;
// const PureRenderMixin = require('react/addons').addons.PureRenderMixin;

module.exports = React.createClass({

  displayName: 'Video',

  propTypes: {
    src: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    currentTimeChanged: PropTypes.func,
    durationChanged: PropTypes.func,
  },

  // mixins: [PureRenderMixin],

  componentDidMount() {
    let video = React.findDOMNode(this);
    video.addEventListener('timeupdate', this._timeUpdate);
    video.addEventListener('progress', this._onProgress);
    video.addEventListener('loadedmetadata', this._loadedMetadata);
    video.addEventListener('ended', this.props.onEnd);
  },

  componentWillUnmount() {
    let video = React.findDOMNode(this);
    video.removeEventListener('timeupdate', this._timeUpdate);
    video.removeEventListener('progress', this._onProgress);
    video.removeEventListener('loadedmetadata', this._loadedMetadata);
    video.removeEventListener('ended', this.props.onEnd);
  },

  _loadedMetadata(event) {
    this.props.metadataLoaded({
      currentTime: event.target.currentTime,
      duration: event.target.duration,
      muted: event.target.muted,
      volume: event.target.volume,
    });
  },

  _timeUpdate(event) {
    this.props.currentTimeChanged(event.target.currentTime);
  },

  _onProgress(event) {
    this.props.onDownloadProgress(event.target.buffered);
  },

  renderSources(src, key) {
    if (Array.isArray(src)) {
      return src.map((src, idx) => this.renderSources(src, idx));
    }

    if (typeof src === 'string') {
      return <source src={src} />;
    }

    if(typeof src === 'object') {
      let props = {src: src.url, type: src.type};
      if (typeof key !== 'undefined') { props.key = key; }
      return <source {...props} />;
    }
  },

  render() {
    const videoProps = {
      autoPlay: this.props.autoPlay,
      width: this.props.width,
      height: this.props.height,
    };

    return (<video {...videoProps}>
      { this.renderSources(this.props.src) }
    </video>);
  },
});
