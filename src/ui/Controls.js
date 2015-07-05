"use strict";

import React from 'react';
const { PropTypes } = React;
import Helpers from '../helpers.js';

module.exports = React.createClass({

  propTypes: {
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    muted: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    requestVolumeChange: PropTypes.func.isRequired,
    requestMute: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      requestVolumeChange: Helpers.noop,
      requestMute: Helpers.noop,
    };
  },

  _requestVolumeChange(event) {
    this.props.requestVolumeChange(parseFloat(event.target.value));
  },

  render() {
    return (<div>
      <div onClick={this.props.requestMute}>{this.props.muted?'Muted':'Mute'}</div>
      <input type="range" max="1" min="0" step={0.01} value={this.props.volume} onChange={this._requestVolumeChange} />
    </div>)
  },
});
