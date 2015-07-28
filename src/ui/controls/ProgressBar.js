"use strict";

import React from 'react';
const { PropTypes } = React;
import Helpers from '../../helpers.js';

var ProgressBar = React.createClass({

  propTypes: {
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    requestSeekStart: PropTypes.func.isRequired,
    requestSeekProgress: PropTypes.func.isRequired,
    requestSeekEnd: PropTypes.func.isRequired,
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
      requestSeekStart: Helpers.noop,
      requestSeekProgress: Helpers.noop,
      requestSeekEnd: Helpers.noop,
    };
  },

  componentWillReceiveProps(nextProps) {
    let state = this.getInitialState(nextProps);
    this.setState(state);
  },

  // shouldComponentUpdate(nextProps) {
  //   // Update component only once in a second
  //   return Math.ceil(this.props.currentTime) !== Math.ceil(nextProps.currentTime);
  // },

  _onChange(event) {
    let currentTime = parseFloat(event.target.value, 10);
    this.setState({currentTime: currentTime});
    this.props.requestSeekProgress(currentTime);
  },

  _onMouseDown() {
    this.props.requestSeekStart();
  },

  _onMouseUp() {
    this.props.requestSeekEnd(this.state.currentTime);
  },

  _renderDownloadedRangesIfAny() {
    if (! this.props.ranges) {
      return null;
    }

    const renderedRanges = [];
    let idx = 0;

    for(idx; idx < this.props.ranges.length; idx++) {
      const start = this.props.ranges.start(idx);
      const end = this.props.ranges.end(idx);
      const percentage = Math.ceil(Math.ceil(end) / Math.ceil(this.props.duration) * 100);
      const left = Math.ceil(Math.ceil(start) / Math.ceil(this.props.duration) * 100);
      const width = percentage - left;
      renderedRanges.push(<div key={idx} style={{width:`${width}%`, left:`${left}%`, position:'absolute', height:10, background:'blue'}}></div>);
    }

    return (<div className="videoplayer--downloaded-ranges" style={{border:'1px solid red', height: 10}}>
      { renderedRanges }
    </div>);

    return html;
  },

  _renderSlider() {
    let { duration, ...restProps } = this.props;
    let { currentTime } = this.state;
    let { _onChange, _onMouseDown, _onMouseUp } = this;

    return (<input
        type="range"
        step={0.01}
        value={currentTime}
        max={duration}
        onChange={_onChange}
        onMouseDown={_onMouseDown}
        onMouseUp={_onMouseUp}
        {...restProps}
    />);
  },

  render() {
    return (<div className="videoplayer--progress-bar">
      { this._renderDownloadedRangesIfAny() }
      { this._renderSlider() }
    </div>);
  }
});

module.exports = ProgressBar;
