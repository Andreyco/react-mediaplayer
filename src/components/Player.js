"use strict";

import React, { PropTypes } from 'react';
import Video from './Video';
import Controls from './Controls/';
import { enterFullscreen, exitFullscreen, fullscreenEnabled, fullscreenElement } from '../helpers.js';
import '../localStorageShim';

export default class Player extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      currentTime: 0,
      duration: 0,
      fullscreen: false,
      playing: false,
      volume: parseFloat(localStorage.getItem('rvp.volume')),
    };

    this.beforeUnload = this.beforeUnload.bind(this);
    this.handleFullscreenChange = this.handleFullscreenChange.bind(this);
    this.resumeLastSession = this.resumeLastSession.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
    this.setMeta = this.setMeta.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this);
  }

  getChildContext() {
    return {
      currentTime: this.state.currentTime,
      duration: this.state.duration,
      fullscreen: this.state.fullscreen,
      playing: this.state.playing,
      setCurrentTime: this.setCurrentTime,
      setMeta: this.setMeta,
      setVolume: this.setVolume,
      toggleFullscreen: this.toggleFullscreen,
      togglePlayback: this.togglePlayback,
      volume: this.state.volume,
    };
  }

  componentDidMount() {
    this.resumeLastSession();

    window.addEventListener("beforeunload", this.beforeUnload);
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.beforeUnload);
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
  }

  /**
   * SESSION HANDLERS
   */
  beforeUnload() {
    localStorage.setItem('rvp.closedAt', new Date().getTime());
    localStorage.setItem('rvp.currentTime', this.state.currentTime);
    localStorage.setItem('rvp.playing', this.state.playing);
    localStorage.setItem('rvp.volume', this.state.volume);
  }

  resumeLastSession() {
    this.setVolume(this.state.volume);

    // If user reopened tab in short time window resume playback from last position.
    // Don't resume after reload (if time window is shorter than 1 second).
    const now = new Date().getTime();
    const closedAt = parseInt(localStorage.getItem('rvp.closedAt'));
    const inTimeWindow = now - closedAt < 5000 && now - closedAt > 1000 ;
    const currentTime = parseInt(localStorage.getItem('rvp.currentTime'));
    const playing = localStorage.getItem('rvp.playing') === 'true';

    if (playing && inTimeWindow) {
      this.setCurrentTime(currentTime);
      this.togglePlayback();
    }
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
  togglePlayback() {
    if (this.state.playing) this.refs.video.refs.element.pause();
    else this.refs.video.refs.element.play();
  }

  /**
   * VOLUME CONTROLS
   */
  setVolume(volume) {
    this.refs.video.refs.element.volume = volume;
  }

  /**
   * SEEK CONTROLS
   */
  setCurrentTime(currentTime) {
    this.refs.video.refs.element.currentTime = currentTime;
    this.setState({currentTime});
  }

  /**
   * FULLSCREEN CONTROLS
   */
  toggleFullscreen() {
    if (fullscreenElement() === this.refs.player) exitFullscreen();
    else enterFullscreen(this.refs.player);
  }

  handleFullscreenChange(event) {
    const fullscreen = fullscreenElement() === this.refs.player;
    this.setState({fullscreen});
  }

  render() {
    const { togglePlayback, setCurrentTime } = this;
    const { width, height, src } = this.props;

    const videoProps = {
      width,
      height,
      src,
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
  fullscreen: PropTypes.bool,
  playing: PropTypes.bool,
  setCurrentTime: PropTypes.func,
  setMeta: PropTypes.func,
  setVolume: PropTypes.func,
  toggleFullscreen: PropTypes.func,
  togglePlayback: PropTypes.func,
  volume: PropTypes.number,
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
