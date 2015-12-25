import React, { PropTypes } from 'react';
import { track as trackStyle, fill as fillStyle } from './styles';

const Track = React.createClass({
  propTypes: {
    max: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  },

  render() {
    const width = this.props.value / this.props.max * 100;

    return (
      <div style={trackStyle}>
        <div style={{...fillStyle, width: `${width}%`}} />
      </div>
    );
  },
});

export default Track;
