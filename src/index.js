import React from 'react';
import Player from './ui/Player';

const src = [
  // {
  //   url: 'http://video.andrejbadin.com/video.mp4',
  //   type: 'video/mp4',
  // }
  {
    url: '/src/video.mp4',
    type: 'video/mp4',
  }
];

React.render(<Player src={src} width={480} height={320} autoPlay />, document.body);
