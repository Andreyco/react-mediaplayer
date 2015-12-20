import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { on, off } from '../helpers/event';
import { enterFullscreen, exitFullscreen } from '../helpers/fullscreen';
import { readMetadata } from '../helpers/media';
import Video from './Video';

import PlaybackToggle from './PlaybackToggle';
import FullscreenToggle from './FullscreenToggle';
import Timestamp from './Timestamp';
import VolumeControl from './VolumeControl';
import ProgressControl from './ProgressControl';

const Player = createClass({
  propTypes: {
    autoPlay: PropTypes.bool,
    controls: PropTypes.bool,
    src: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        type: PropTypes.string,
      })
    ).isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  },

  /**
   * PROVIDE CONTEXT FOR CHILD COMPONENTS.
   * Context makes work easier in special cases. This is one of those
   * cases. Child tree is deep and several child components can control
   * parent/sibling component (media element in this case). Passing data as
   * props is inefficient, makes more complicated.
   */
  childContextTypes: {
    media: PropTypes.shape({
      buffered: PropTypes.object,
      fullscreen: PropTypes.bool,
      muted: PropTypes.bool,
      playing: PropTypes.bool,
      setVolume: PropTypes.func,
      toggleFullscreen: PropTypes.func,
      toggleMute: PropTypes.func,
      togglePlayback: PropTypes.func,
      volume: PropTypes.number,
    }),
  },

  getChildContext() {
    return {
      media: {
        muted: false,
        volume: 1,
        ...this.state.media,
        setVolume: this.setVolume,
        toggleFullscreen: this.toggleFullscreen,
        toggleMute: this.toggleMute,
        togglePlayback: this.togglePlayback,
      },
    };
  },

  getInitialState() {
    return {
      media: {
        currentTime: 0,
        duration: 0,
        fullscreen: false,
        paused: true,
        playing: false,
      },
    };
  },

  componentDidMount() {
    const media = findDOMNode(this.refs.media);
    on(media, 'durationchange', this.updateMediaState);
    on(media, 'loadedmetadata', this.updateMediaState);
    on(media, 'volumechange', this.updateMediaState);
    on(media, 'timeupdate', this.updateMediaState);
    on(media, 'progress', this.updateMediaState);
    on(media, 'playing', this.updateMediaState);
    on(media, 'pause', this.updateMediaState);
    on(document, `fullscreenchange MSFullscreenChange mozfullscreenchange webkitfullscreenchange`, this.updateMediaState);
  },

  componentWillUnmount() {
    const media = findDOMNode(this.refs.media);
    off(media, 'durationchange', this.updateMediaState);
    off(media, 'loadedmetadata', this.updateMediaState);
    off(media, 'volumechange', this.updateMediaState);
    off(media, 'timeupdate', this.updateMediaState);
    off(media, 'progress', this.updateMediaState);
    off(media, 'playing', this.updateMediaState);
    off(media, 'pause', this.updateMediaState);
  },

  media() {
    return findDOMNode(this.refs.media);
  },

  updateMediaState(event) {
    const media = readMetadata(event.target);
    console.log(media);
    this.setState({ media });
  },

  fullscreenChanged(event) {
    this.updateMediaState(event);
  },

  togglePlayback() {
    if (this.state.media.playing) this.media().pause();
    else this.media().play();
  },

  toggleFullscreen() {
    if (this.state.media.fullscreen) exitFullscreen();
    else enterFullscreen(this.media());
  },

  setVolume(level) {
    const media = this.media();
    media.volume = level;
    media.muted = false;
  },

  toggleMute() {
    if (this.state.media.muted) this.media().muted = false;
    else this.media().muted = true;
  },

  render() {
    const { width, height, src, autoPlay, controls } = this.props;
    return (
      <div style={{background: '#000', width, height}}>
        <Video ref="media" {...{ width, height, src, controls, autoPlay }} />
        <PlaybackToggle />
        <FullscreenToggle />
        <Timestamp />
        <VolumeControl />
        <ProgressControl />
      </div>
    );
  },
});

export default Player;
