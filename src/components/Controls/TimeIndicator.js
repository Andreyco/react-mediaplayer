"use strict";

import React, { PropTypes } from 'react';

function secondsToTimeString(seconds) {
  const totalSeconds = parseInt(seconds, 10);

  let timeStr = (new Date(totalSeconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0].split(':');

  if (timeStr[0] === '00') {
    timeStr.shift();
  }

  return timeStr.join(':');
}

export default function TimeIndicator(props) {
  const currentTime = secondsToTimeString(props.currentTime);
  const totalTime = secondsToTimeString(props.totalDuration);
  
  return (
    <div>{ currentTime } / { totalTime }</div>
  );
}

TimeIndicator.propTypes = {
  currentTime: PropTypes.number.isRequired,
  totalDuration: PropTypes.number.isRequired,
};
