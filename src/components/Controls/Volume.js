"use strict";

import React, { Component, PropTypes } from 'react';
import UIRange from '../../ui/range';

class Volume extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.context.setCurrentTime(value);
  }

  render() {
    const props = {
      value: this.context.volume,
      onChange: this.context.setVolume,
    };

    return <UIRange step={0.01} min={0} max={1} {...props}/>;
  }
}

Volume.contextTypes = {
  volume: PropTypes.number,
  setVolume: PropTypes.func,
};

export default Volume;
