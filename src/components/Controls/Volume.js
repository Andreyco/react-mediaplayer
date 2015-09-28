"use strict";

import React, { Component, PropTypes } from 'react';
import UISlider from '../../ui/slider';

export default class Volume extends Component {
  render() {
    const props = {
      value: this.context.volume,
      onChange: this.context.setVolume,
    };

    return <UISlider step={0.01} min={0} max={1} {...props}/>;
  }
}

Volume.contextTypes = {
  volume: PropTypes.number,
  setVolume: PropTypes.func,
};
