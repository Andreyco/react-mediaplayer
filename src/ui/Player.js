"use strict";

import React from 'react';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import TimeIndicator from './TimeIndicator';
import Video from './Video';
import Helpers from '../helpers.js';

let Player = React.createClass({

  propTypes: {
    src: React.PropTypes.string.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    autoPlay: React.PropTypes.bool,
  },

  getInitialState() {
    return {
      currentTime: 0,
      duration: 0,
      paused: ! this.props.autoPlay,
    };
  },

  video() {
    return React.findDOMNode(this.refs.video);
  },

  togglePlayback() {
    if (this.state.paused) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  },

  playVideo() {
    if (! this.state.paused) { return; }
    this.setState({paused: false});
    this.video().play();
  },

  pauseVideo() {
    if (this.state.paused) { return; }
    this.setState({paused: true});
    this.video().pause();
  },

  setCurrentTime(event) {
    this.setState({currentTime: event.target.currentTime});
  },

  setDuration(event) {
    this.setState({duration: event.target.duration});
  },

  onEnd(event) {
    // this.setState({paused: true});
  },

  setBuffered(event) {
    // console.log(event.target.buffered.start(0), event.target.buffered.end(0));
  },

  onSeekProgress(time) {
    this.pauseVideo();
    this.video().currentTime = time;
  },

  onSeekEnd() {
    this.video().play();
  },

  render() {
    let { width, height, src, ...restProps } = this.props;

    return (<div className="videoplayer" style={{...{}, width, height}}>
      <Video
          ref="video"
          src={src} width={width} height={height}
          currentTimeChanged={this.setCurrentTime}
          durationChanged={this.setDuration}
          onProgress={this.setBuffered}
          onEnd={this.onEnd}
          {...restProps}
      />
      <div className="videoplayer-controls">
        <PlayButton onClick={this.togglePlayback} paused={this.state.paused} />
        <TimeIndicator currentTime={this.state.currentTime} duration={this.state.duration} />
      </div>
      <ProgressBar
          duration={this.state.duration}
          currentTime={this.state.currentTime}
          onSeekProgress={this.onSeekProgress}
          onSeekEnd={this.onSeekEnd}
      />
    </div>);
  }
});

module.exports = Player;
