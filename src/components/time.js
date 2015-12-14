"use strict";

import React, { PropTypes } from 'react';

export default function Time(props) {
  const totalSeconds = parseInt(props.time || 0, 10);
  const time = (new Date(totalSeconds * 1000))
    .toUTCString()
    .match(/(\d\d:\d\d:\d\d)/)[0]
    .split(':');

  if (time[0] === '00') time.shift();

  return <span>{ time.join(':') }</span>;
}

Time.propTypes = {
  time: PropTypes.number,
};
