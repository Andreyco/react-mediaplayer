"use strict";

import React from 'react';
let { PropTypes } = React;

let TimeIndicator = React.createClass({
  
  propTypes: {
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  },
  
  render() {
    return (<div className="videoplayer--time-indicator">
      <span className="current-time">{this.props.currentTime}</span>
      <span className="separator">/</span>
      <span className="duration">{this.props.duration}</span>
    </div>);
  },
});

module.exports = TimeIndicator;
