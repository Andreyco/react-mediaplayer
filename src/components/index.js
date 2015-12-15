import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { on, off } from '../helpers/event';
import { enterFullscreen, exitFullscreen } from '../helpers/fullscreen';
import { readMetadata } from '../helpers/media';
import Video from './Video';

import PlaybackToggle from './PlaybackToggle';
import FullscreenToggle from './FullscreenToggle';
import Timestamp from './Timestamp';

const Player = createClass({
  propTypes: {
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
      fullscreen: PropTypes.bool,
      playing: PropTypes.bool,
      toggleFullscreen: PropTypes.func,
      togglePlayback: PropTypes.func,
    }),
  },

  getChildContext() {
    return {
      media: {
        ...this.state.media,
        toggleFullscreen: this.toggleFullscreen,
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
    on(media, 'loadedmetadata', this.updateMediaState);
    on(media, 'playing', this.updateMediaState);
    on(media, 'pause', this.updateMediaState);
    on(document, `fullscreenchange MSFullscreenChange mozfullscreenchange webkitfullscreenchange`, this.updateMediaState);

    // on(this.refs.element, 'durationchange', setDuration.bind(this));
    // on(this.refs.element, 'progress', setDownloadProgress.bind(this));
    // on(this.refs.element, 'timeupdate', setCurrentTime.bind(this));
    // on(this.refs.element, 'volumechange', setVolume.bind(this));
  },

  componentWillUnmount() {
    const media = findDOMNode(this.refs.media);
    off(media, 'loadedmetadata', this.updateMediaState);
    off(media, 'playing', this.updateMediaState);
    off(media, 'pause', this.updateMediaState);
  },

  media() {
    return findDOMNode(this.refs.media);
  },

  updateMediaState(event) {
    const media = readMetadata(event.target)
    console.log(media);
    this.setState({ media });
  },

  fullscreenChanged(event) {
    this.updateMediaState(event)
  },

  togglePlayback() {
    if (this.state.media.playing)
      this.media().pause();
    else
      this.media().play();
  },

  toggleFullscreen() {
    if (this.state.media.fullscreen)
      exitFullscreen();
    else
      enterFullscreen(this.media());
  },

  render() {
    const { width, height, src, autoPlay, controls } = this.props;
    return (
      <div style={{background: '#ccc', width, height}}>
        <Video ref="media" {...{ width, height, src, controls, autoPlay }} />
        <PlaybackToggle />
        <FullscreenToggle />
        <Timestamp />
      </div>
    );
  }
});

export default Player;
