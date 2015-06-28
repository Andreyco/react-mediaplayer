"use strict";

import React from 'react';
let { PropTypes } = React;

function secondsToTimeString(seconds) {
  const totalSeconds = parseInt(seconds, 10);
  
  let timeStr = (new Date(totalSeconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0].split(':');

  if (timeStr[0] === '00') {
    timeStr.shift();
  }
  
  return timeStr.join(':');
}

let TimeIndicator = React.createClass({
  
  propTypes: {
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  },
  
  getCurrentTime() {
    return secondsToTimeString(this.props.currentTime);
  },
  
  getDuration() {
    return secondsToTimeString(this.props.duration);
  },
  
  render() {
    return (<div className="videoplayer--time-indicator">
      <span className="current-time">{this.getCurrentTime()}</span>
      <span className="separator">/</span>
      <span className="duration">{this.getDuration()}</span>
    </div>);
  },
});

module.exports = TimeIndicator;
