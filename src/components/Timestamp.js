import React, { PropTypes } from 'react';
import { readableTime } from '../helpers/media';

const Timestamp = (
  {},
  { media }
) => (
  <span>
    { readableTime(media.currentTime) } / { readableTime(media.duration) }
  </span>
);

Timestamp.contextTypes = {
  media: PropTypes.shape({
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
};

export default Timestamp;
