"use strict";

import React from 'react';
import PlayButton from './PlayButton';
import TimeIndicator from './TimeIndicator';
import Video from './Video';

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
    if (this.video().paused) {
      this.playVideo();
    } else {
      this.pauseVideo();
    }
  },
  
  playVideo() {
    this.video().play();
    this.setState({paused: false});
  },
  
  pauseVideo() {
    this.video().pause();
    this.setState({paused: true});
  },
  
  setCurrentTime(event) {
    this.setState({currentTime: event.target.currentTime});
  },
  
  setDuration(event) {
    this.setState({duration: event.target.duration});
  },
  
  },

  render() {
    let { width, height, src, ...restProps } = this.props;

    return (<div className="videoplayer" style={{...{}, width, height}}>
      <Video 
        ref="video" {...restProps}
        src={src} width={width} height={height}
        currentTimeChanged={this.setCurrentTime}
        durationChanged={this.setDuration}
      />
      <div className="videoplayer-controls">
        <PlayButton onClick={this.togglePlayback} paused={this.state.paused} />
        <TimeIndicator currentTime={this.state.currentTime} duration={this.state.duration} />
      </div>
    </div>);
  }
});

module.exports = Player;
