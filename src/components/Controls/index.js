"use strict";

import React from 'react';
import Fullscreen from './Fullscreen';
import Play from './Play';
import Timeline from './Timeline';
import Volume from './Volume';

export default function Controls () {
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
