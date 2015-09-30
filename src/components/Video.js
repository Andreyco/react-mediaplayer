"use strict";

import React, { PropTypes, Component } from 'react';
import { on, off } from '../helpers';

/**
 * Couple of event listeners which listen to events
 * fired by Video element. These listeners set
 * players state such a volume, curren time, duratin, ...
 */
const setMeta = function(event) {
  this.context.setMeta({
    currentTime: event.target.currentTime,
    duration: event.target.duration,
  });
};

const setDuration = function(event) {
  this.context.setMeta({duration: event.target.duration});
};

const setPlaybackState = function(event) {
  this.context.setMeta({playing: !event.target.paused});
};

const setDownloadProgress = function(event) {
  this.context.setMeta({ranges: event.target.buffered});
};

const setCurrentTime = function(event) {
  this.context.setMeta({currentTime: event.target.currentTime});
};

const setVolume = function(event) {
  this.context.setMeta({volume: event.target.volume});
};



/**
 * Video Source
 */
const Source = function({src, type}, key) {
  return <source {...{key, src, type}} />;
};

Source.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string,
};



/**
 * Video component
 */
export default class Video extends Component {
  componentDidMount() {
    on(this.refs.element, 'durationchange', setDuration.bind(this));
    on(this.refs.element, 'loadedmetadata', setMeta.bind(this));
    on(this.refs.element, 'pause', setPlaybackState.bind(this));
    on(this.refs.element, 'playing', setPlaybackState.bind(this));
    on(this.refs.element, 'progress', setDownloadProgress.bind(this));
    on(this.refs.element, 'timeupdate', setCurrentTime.bind(this));
    on(this.refs.element, 'volumechange', setVolume.bind(this));
  }

  componentWillUnmount() {
    off(this.refs.element, 'durationchange', setDuration);
    off(this.refs.element, 'loadedmetadata', setMeta);
    off(this.refs.element, 'pause', setPlaybackState);
    off(this.refs.element, 'playing', setPlaybackState);
    off(this.refs.element, 'progress', setDownloadProgress);
    off(this.refs.element, 'timeupdate', setCurrentTime);
    off(this.refs.element, 'volumechange', setVolume);
  }

  render() {
    const { width, height, src } = this.props;
    return (
      <video ref="element" {...{width, height}}>
        { src.map(Source) }
      </video>
    );
  }
}

Video.propTypes = {
  src: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};


Video.contextTypes = {
  setMeta: PropTypes.func.isRequired,
};
