"use strict";

import React, { Component, PropTypes } from 'react';

export default class Play extends Component {
  render() {
    const { playing, togglePlayback } = this.context;

    return (
      <div onClick={togglePlayback}>{ playing ? 'Stop' : 'Play' }</div>
    );
  }
}

Play.contextTypes = {
  playing: PropTypes.bool.isRequired,
  togglePlayback: PropTypes.func.isRequired,
};
