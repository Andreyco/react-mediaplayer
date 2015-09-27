"use strict";

import React, { Component, PropTypes } from 'react';
import UIRange from '../../ui/range';

export default class Volume extends Component {
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
