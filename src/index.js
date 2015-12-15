import React from 'react';
import ReactDom from 'react-dom';
import Player from './components/index';

const src = [
  {
    src: 'http://www.w3schools.com/html/mov_bbb.mp4',
    type: 'video/mp4',
  }
];

const wrapper = document.getElementById('react-video-player');

ReactDom.render(<Player src={src} width={480} height={300} />, wrapper);
