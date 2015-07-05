"use strict";

import React from 'react';
const { PropTypes } = React;
import Helpers from '../helpers.js';
import PlayButton from './controls/PlayButton.js';
import TimeIndicator from './controls/TimeIndicator.js';


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

  renderVolumeControls() {
    const classnames = ['videoplayer--volume-indicator'];
    if (this.props.volume === 0 || this.props.muted) {
      classnames.push('level-muted')
    } else if (this.props.volume < 0.34) {
      classnames.push('level-1-3');
    } else if (this.props.volume < 0.67) {
      classnames.push('level-2-3');
    } else {
      classnames.push('level-3-3');
    }

    return (<div className="videoplayer--volumne-controls">
      <div className={classnames.join(' ')} onClick={this.props.requestMute}>{this.props.muted?'Muted':'Mute'}</div>
      <input type="range" max="1" min="0" step={0.01} value={this.props.volume} onChange={this._requestVolumeChange} />
    </div>);
  },

  render() {
    return (<div>
      <TimeIndicator currentTime={this.props.currentTime} duration={this.props.duration} />
      <PlayButton paused={!this.props.playAfterSeek && this.props.paused} onClick={this.props.requestPlaybackToggle} />
      { this.renderVolumeControls() }
    </div>)
  },
});
