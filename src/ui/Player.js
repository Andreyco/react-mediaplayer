"use strict";

import React from 'react';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import TimeIndicator from './TimeIndicator';
import Video from './Video';
import Controls from './Controls';
import Helpers from '../helpers.js';

let Player = React.createClass({

  propTypes: {
    src: React.PropTypes.any.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    autoPlay: React.PropTypes.bool,
  },

  getInitialState() {
    return {
      currentTime: 0,
      duration: 0,
      paused: ! this.props.autoPlay,
      muted: false,
      volume: 0,
      ranges: null,
    };
  },

  _video() {
    return React.findDOMNode(this.refs.video);
  },

  _togglePlayback() {
    if (this.state.paused) {
      this._playVideo();
    } else {
      this._pauseVideo();
    }
  },

  _playVideo() {
    if (! this.state.paused) { return; }
    this.setState({paused: false});
    this._video().play();
  },

  _pauseVideo() {
    if (this.state.paused) { return; }
    this.setState({paused: true});
    this._video().pause();
  },

  _setCurrentTimeFromVideo(time) {
    if (this.state.seekInProgress) { return; }
    this.setState({currentTime: time});
  },

  _setMetadata(metadata) {
    this.setState({
      currentTime: metadata.currentTime,
      duration: metadata.duration,
      muted: metadata.muted,
      volume: metadata.volume,
    });
  },

  _setVolume(level) {
    this.setState({volume: level});
    this._video().volume = level;
  },

  _onEnd() {
    this.setState({paused: true});
  },

  _setDownloadedRanges(ranges) {
    this.setState({ranges: ranges});
  },

  _onSeekStart() {
    this.state.playAfterSeek = ! this.state.paused;
    this.state.seekInProgress = true;
    this._pauseVideo();
  },

  _onSeekProgress(time) {
    this.setState({currentTime: time});
    this._video().currentTime = time;
  },

  _onSeekEnd() {
    if (this.state.playAfterSeek) {
      this._playVideo();
    }
    this.state.playAfterSeek = false;
    this.state.seekInProgress = false;
  },

  renderControls() {
    return (<Controls {...{
      onVolumeChange: this._setVolume,
      ...this.state
    }} />);
  },

  render() {

    const { width, height, src, ...restProps } = this.props;
    return (<div className="videoplayer" style={{...{}, width, height}}>
      <Video
          ref="video"
          src={src} width={width} height={height}
          metadataLoaded={this._setMetadata}
          onDownloadProgress={this._setDownloadedRanges}
          currentTimeChanged={this._setCurrentTimeFromVideo}
          onEnd={this._onEnd}
          {...restProps}
      />
      <div className="videoplayer-controls">
        <PlayButton onClick={this._togglePlayback} paused={!this.state.playAfterSeek && this.state.paused} />
        <TimeIndicator currentTime={this.state.currentTime} duration={this.state.duration} />
      </div>
      <ProgressBar
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          onSeekStart={this._onSeekStart}
          onSeekProgress={this._onSeekProgress}
          onSeekEnd={this._onSeekEnd}
          ranges={this.state.ranges}
      />
      { this.renderControls() }
    </div>);
  }
});

module.exports = Player;
