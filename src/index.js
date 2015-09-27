import React from 'react';
import ReactDom from 'react-dom';
import Player from './components/Player';

const src = [
  {
    url: '/video.mp4',
    type: 'video/mp4',
  }
];

const wrapper = document.getElementById('react-video-player');

ReactDom.render(<Player src={src} width={480} height={300} autoPlayy />, wrapper);
