import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { on, off } from '../helpers/event';
import { readMetadata } from '../helpers/media';
import Video from './Video';

import PlaybackToggle from './PlaybackToggle';

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
      playing: PropTypes.bool,
      togglePlayback: PropTypes.func,
    }),
  },

  getChildContext() {
    return {
      media: {
        ...this.state.media,
        togglePlayback: this.togglePlayback,
      },
    };
  },

  getInitialState() {
    return {
      media: {
        playing: false,
        paused: true,
      },
    };
  },

  componentDidMount() {
    const media = findDOMNode(this.refs.media);
    on(media, 'loadedmetadata', this.updateMediaState);
    on(media, 'playing', this.updateMediaState);
    on(media, 'pause', this.updateMediaState);
    // on(this.refs.element, 'durationchange', setDuration.bind(this));
    // on(this.refs.element, 'loadedmetadata', setMeta.bind(this));
    // on(this.refs.element, 'pause', setPlaybackState.bind(this));
    // on(this.refs.element, 'playing', setPlaybackState.bind(this));
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

  togglePlayback() {
    if (this.state.media.playing)
      this.media().pause();
    else
      this.media().play();
  },

  render() {
    const { width, height, src, autoPlay, controls } = this.props;
    return (
      <div style={{background: '#ccc', width, height}}>
        <Video ref="media" {...{ width, height, src, controls, autoPlay }} />
        <PlaybackToggle />
      </div>
    );
  }
});

export default Player;
