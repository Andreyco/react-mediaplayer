import css from "./scss/react-video-base.scss";
import React from 'react';
import Player from './components/Player';

const src = [
  {
    url: '/src/video.mp4',
    type: 'video/mp4',
  }
];

React.render(<Player src={src} width={480} height={300} autoPlay />, document.body);
