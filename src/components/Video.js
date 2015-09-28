"use strict";

import React, { PropTypes, Component } from 'react';

export default class Video extends Component {
  componentDidMount() {
    const { setMeta } = this.context;
    const { element } = this.refs;
    element.addEventListener('durationchange', e => setMeta({duration: e.target.duration}));
    element.addEventListener('loadedmetadata', e => setMeta({
      currentTime: e.target.currentTime,
      duration: e.target.duration,
    }));
    element.addEventListener('pause', e => setMeta({playing: false}));
    element.addEventListener('playing', e => setMeta({playing: true}));
    element.addEventListener('timeupdate', e => setMeta({currentTime: e.target.currentTime}));
    element.addEventListener('volumechange', e => setMeta({volume: e.target.volume}));
  }

  render() {
    const { width, height, src } = this.props;
    return (
      <video ref="element" {...{width, height}}>
        { src.map((s, i) => <source key={`${s.url}${i}`} src={s.url} type={s.type} />) }
      </video>
    );
  }
}

Video.propTypes = {
  src: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};


Video.contextTypes = {
  setMeta: PropTypes.func.isRequired,
};
