"use strict";

import React, { PropTypes } from 'react';
import Time from '../../ui/time';

export default function TimeIndicator(props) {
  return (
    <div>
      <Time time={props.currentTime} /> / <Time time={props.duration} />
    </div>
  );
}

TimeIndicator.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};
