"use strict";

import React from 'react';
let { PropTypes } = React;
import Helpers from '../helpers.js';

var ProgressBar = React.createClass({

  propTypes: {
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    onSeekStart: PropTypes.func.isRequired,
    onSeekProgress: PropTypes.func.isRequired,
    onSeekEnd: PropTypes.func.isRequired,
  },

  getInitialState(props) {
    if (! props) {
      props = this.props;
    }

    return {
      currentTime: this.props.currentTime,
    };
  },

  getDefaultProps() {
    return {
      onSeekStart: Helpers.noop,
      onSeekProgress: Helpers.noop,
      onSeekEnd: Helpers.noop,
    };
  },

  componentWillReceiveProps(nextProps) {
    let state = this.getInitialState(nextProps);
    this.setState(state);
  },

  onChange(event) {
    let currentTime = parseInt(event.target.value, 10);
    this.setState({currentTime: currentTime});
    this.props.onSeekProgress(currentTime);
  },

  onMouseDown() {
    this.props.onSeekStart();
  },

  onMouseUp() {
    this.props.onSeekEnd(this.state.currentTime);
  },

  renderBufferedData() {
    return '';
  },

  renderSlider() {
    let { duration, ...restProps } = this.props;
    let { currentTime } = this.state;
    let { onChange, onMouseDown, onMouseUp } = this;

    return (<input
        type="range"
        step={0.01}
        value={currentTime}
        max={duration}
        onChange={onChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        {...restProps}
    />);
  },

  render() {
    return (<div className="videoplayer--progress-bar">
      { this.renderBufferedData() }
      { this.renderSlider() }
    </div>);
  }
});

module.exports = ProgressBar;
