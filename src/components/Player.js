"use strict";

import React, { PropTypes } from 'react';
import Video from './Video';
import Controls from './Controls/';
import * as _rv from '../helpers.js';
import '../localStorageShim';

class Player extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 0,
      playing: false,
      volume: parseFloat(localStorage.getItem('rvp.volume')),
    };

    this.setMeta = this.setMeta.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this);
    this.playbackStarted = this.playbackStarted.bind(this);
    this.playbackPaused = this.playbackPaused.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.durationChanged = this.durationChanged.bind(this);
    this.currentTimeChanged = this.currentTimeChanged.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
  }

  getChildContext() {
    return {
      currentTime: this.state.currentTime,
      duration: this.state.duration,
      pause: this.pause,
      play: this.play,
      playing: this.state.playing,
      setCurrentTime: this.setCurrentTime,
      setVolume: this.setVolume,
      togglePlayback: this.togglePlayback,
      volume: this.state.volume,
    };
  }

  componentDidMount() {
    this.setVolume(this.state.volume);
  }

  /**
   * METADATA & EVENTS
   */
  setMeta(meta) {
    this.setState(meta);
  }

  /**
   * PLAYBACK CONTROLS
   * Listen to playback state changes.
   */
  play() {
    this.refs.video.refs.element.play();
  }

  pause() {
    this.refs.video.refs.element.pause();
  }

  togglePlayback() {
    if (this.state.playing) {
      this.pause();
    } else {
      this.play();
    }
  }

  playbackStarted() {
    this.setState({playing: true});
  }

  playbackPaused() {
    this.setState({playing: false});
  }

  /**
   * VOLUME CONTROLS
   */
  setVolume(volume) {
    this.setState({volume});
    localStorage.setItem('rvp.volume', volume);
    this.refs.video.refs.element.volume = volume;
  }

  /**
   * SEEK CONTROLS
   */
  durationChanged(duration) {
    this.setState({duration});
  }

  setCurrentTime(currentTime) {
    this.setState({currentTime});
    this.refs.video.refs.element.currentTime = currentTime;
  }

  currentTimeChanged(currentTime) {
    this.setState({currentTime});
  }

  render() {
    const { setMeta, togglePlayback, playbackStarted, playbackPaused, setVolume, durationChanged, setCurrentTime, currentTimeChanged } = this;
    const { width, height, src } = this.props;

    const videoProps = {
      width,
      height,
      src,
      setMeta,
      playbackStarted,
      playbackPaused,
      durationChanged,
      currentTimeChanged,
    };

    return (
      <div ref="player" className="react-video" style={{width, height}}>
        <Video ref="video" {...videoProps} />
        <Controls />
      </div>
    );
  }
}

Player.childContextTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  pause: PropTypes.func,
  play: PropTypes.func,
  playing: PropTypes.bool,
  setCurrentTime: PropTypes.func,
  volume: PropTypes.number,
  togglePlayback: PropTypes.func,
  setVolume: PropTypes.func,
};

Player.propTypes = {
  // Video props
  src: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Player;
