"use strict";

import React, { PropTypes, Component } from 'react';
import Timeline from './Timeline';
import Volume from './Volume';

export default class Controls extends Component {
  render() {
    return (
      <div>
        <Volume />
        <br/>
        <Timeline />
      </div>
    );
  }
}
