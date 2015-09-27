"use strict";

import React, { Component, PropTypes } from 'react';

// TODO determine whether fullscreen is enabled. If not, display info (tooltip over button?)
export default class Fullscreen extends Component {
  render() {
    const { fullscreen, toggleFullscreen } = this.context;

    return (
      <div onClick={toggleFullscreen}>{ fullscreen ? 'Exit full' : 'Go full' }</div>
    );
  }
}

Fullscreen.contextTypes = {
  fullscreen: PropTypes.bool.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
};
