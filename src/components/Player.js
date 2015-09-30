"use strict";

import React, { PropTypes } from 'react';
import Video from './Video';
import Controls from './Controls/';
import '../localStorageShim';
import {
  on, off,
  enterFullscreen, exitFullscreen, fullscreenElement
} from '../helpers.js';

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

    on(window, 'beforeunload', this.beforeUnload.bind(this));
    on(document, `fullscreenchange MSFullscreenChange mozfullscreenchange
      webkitfullscreenchange`, this.handleFullscreen.bind(this));
  }

  componentWillUnmount() {
    off(window, 'beforeunload', this.beforeUnload);
    off(document, `fullscreenchange MSFullscreenChange mozfullscreenchange
      webkitfullscreenchange`, this.handleFullscreen);
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
    // If user reopened tab in short time window resume playback from last
    // position. Don't resume after reload (if time window is shorter
    // than 1 second).
    const now = new Date().getTime();
    const closedAt = parseInt(localStorage.getItem('rvp.closedAt'));
    const inTimeWindow = now - closedAt < 5000 && now - closedAt > 1000 ;
    const currentTime = parseInt(localStorage.getItem('rvp.currentTime'));
    const playing = localStorage.getItem('rvp.playing') === 'true';

    if (playing && inTimeWindow) {
      this.setCurrentTime(currentTime);
      this.togglePlayback();
    }

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
    if (this.state.fullscreen) exitFullscreen();
    else enterFullscreen(this.refs.player);
  }

  handleFullscreen() {
    const fullscreen = fullscreenElement() === this.refs.player;
    this.setState({fullscreen});
  }

  render() {
    const { width, height, src } = this.props;
    return (
      <div ref="player" className="react-video" style={{width, height}}>
        <Video ref="video" {...{width, height, src}} />
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
      src: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
