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
    onVolumeChange: PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      onVolumeChange: Helpers.noop,
    };
  },

  _onVolumeChange(event) {
    this.props.onVolumeChange(parseFloat(event.target.value));
  },

  render() {
    return (<div>
      <input type="range" max="1" min="0" step={0.01} value={this.props.volume} onChange={this._onVolumeChange} />
    </div>)
  },
});
