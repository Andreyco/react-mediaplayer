"use strict";

import React, { PropTypes, Component } from 'react';
import Play from './Play';
import Timeline from './Timeline';
import Volume from './Volume';

export default class Controls extends Component {
  render() {
    return (
      <div>
        <Play />
        <br/>
        <Volume />
        <br/>
        <Timeline />
      </div>
    );
  }
}
