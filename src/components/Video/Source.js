import React, { PropTypes } from 'react';

const Source = (
  { src, type }
) => (
  <source src={src} type={type} />
);

Source.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Source;
