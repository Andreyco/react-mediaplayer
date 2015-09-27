"use strict";

import React, { PropTypes, Component } from 'react';
import Fullscreen from './Fullscreen';
import Play from './Play';
import Timeline from './Timeline';
import Volume from './Volume';

export default class Controls extends Component {
  render() {
    return (
      <div>
        <Play />
        <br/>
        <Fullscreen />
        <br/>
        <Volume />
        <br/>
        <Timeline />
      </div>
    );
  }
}
