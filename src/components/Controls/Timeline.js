"use strict";

import React, { Component, PropTypes } from 'react';
import UIRange from '../../ui/range';
import TimeIndicator from './TimeIndicator';

export default class Timeline extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.beforeChange = this.beforeChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.afterChange = this.afterChange.bind(this);
  }

  beforeChange() {
    if (this.context.playing) {
      this.setState({resume: true});
      this.context.togglePlayback();
    }
  }

  onChange(value) {
    this.context.setCurrentTime(value);
  }

  afterChange() {
    if (this.state.resume) {
      this.context.togglePlayback();
    }

    this.setState({resume: false});
  }

  render() {
    const props = {
      max: this.context.duration,
      value: this.context.currentTime,
      afterChange: this.afterChange,
      beforeChange: this.beforeChange,
      onChange: this.onChange,
    };

    return (
      <div>
        <UIRange step={1} min={0} {...props}/>
        <TimeIndicator currentTime={props.value} totalDuration={props.max} />
      </div>
    );
  }
}

Timeline.contextTypes = {
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  playing: PropTypes.bool.isRequired,
  setCurrentTime: PropTypes.func,
  togglePlayback: PropTypes.func.isRequired,
};
