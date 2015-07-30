"use strict"

import * as _rv from '../helpers.js'
import cx from 'classnames'
import React from 'react'
import Video from './Video'
// import Controls from './Controls'




export default class Player extends React.Component {

  displayName = "Player"

  state = {
    fullscreen: false,
    seekInProgress: false,
  }

  constructor (props) {
    super(props);

    this._setDownloadProgress = this._setDownloadProgress.bind(this);
    this._setCurrentTimeFromVideo = this._setCurrentTimeFromVideo.bind(this);
    this._setMetadata = this._setMetadata.bind(this);
    this._toggleFullscreen = this._toggleFullscreen.bind(this);
  }

  // propTypes: {
  //   src: React.PropTypes.any.isRequired,
  //   width: React.PropTypes.number.isRequired,
  //   height: React.PropTypes.number.isRequired,
  //   autoPlay: React.PropTypes.bool,
  // }
  //
  // getInitialState() {
  //   return {
  //     currentTime: 0,
  //     duration: 0,
  //     paused: ! this.props.autoPlay,
  //     muted: false,
  //     volume: 0,
  //     ranges: null,
  //   };
  // }
  //
  // _video() {
  //   return React.findDOMNode(this.refs.video);
  // }
  //
  // _togglePlayback() {
  //   if (this.state.paused) {
  //     this._playVideo();
  //   } else {
  //     this._pauseVideo();
  //   }
  // }
  //
  // _playVideo() {
  //   if (! this.state.paused) { return; }
  //   this.setState({paused: false});
  //   this._video().play();
  // }
  //
  // _pauseVideo() {
  //   if (this.state.paused) { return; }
  //   this.setState({paused: true});
  //   this._video().pause();
  // }

  _setCurrentTimeFromVideo(time) {
    if (this.state.seekInProgress) { return; }
    this.setState({currentTime: time});
  }

  _setMetadata(metadata) {
    this.setState({
      currentTime: metadata.currentTime,
      duration: metadata.duration,
      muted: metadata.muted,
      volume: metadata.volume,
    });
  }

  // _setVolume(level) {
  //   this.setState({
  //     volume: level,
  //     muted: false,
  //   });
  //   this._video().volume = level;
  //   this._video().muted = false;
  // }
  //
  // _toggleMute() {
  //   this._video().muted = !this.state.muted;
  //   this.setState({muted: !this.state.muted});
  // }
  //
  // _onEnd() {
  //   this.setState({paused: true});
  // }

  _setDownloadProgress(ranges) {
    this.setState({ranges: ranges});
  }

  // _onSeekStart() {
  //   this.state.playAfterSeek = ! this.state.paused;
  //   this.state.seekInProgress = true;
  //   this._pauseVideo();
  // }
  //
  // _onSeekProgress(time) {
  //   this.setState({currentTime: time});
  //   this._video().currentTime = time;
  // }
  //
  // _onSeekEnd() {
  //   if (this.state.playAfterSeek) {
  //     this._playVideo();
  //   }
  //   this.state.playAfterSeek = false;
  //   this.state.seekInProgress = false;
  // }

  _toggleFullscreen() {
    if (this.state.fullscreen) {
      _rv.exitFullscreen();
    } else {
      _rv.enterFullscreen(React.findDOMNode(this.refs.player));
    }

    this.setState({fullscreen: !this.state.fullscreen});
  }

  // // _onFullscreenEnterRequest() {
  // //   console.log('fs enter');
  // // },
  // //
  // // _onFullscreenExitRequest() {
  // //   console.log('fs exit');
  // // },
  //
  _renderControls() {
    return (
      <div className="react-video-controls">
        <div onClick={this._toggleFullscreen}>Fullscreen</div>
      </div>
    );
  //
  //   return (
  //     <Controls
  //       video={this.refs.video}
  //       player={this.refs.player}
  //       requestPlaybackToggle={this._togglePlayback}
  //       requestVolumeChange={this._setVolume}
  //       requestMute={this._toggleMute}
  //       requestSeekStart={this._onSeekStart}
  //       requestSeekProgress={this._onSeekProgress}
  //       requestSeekEnd={this._onSeekEnd}
  //       requestFullscreenEnter={this._onFullscreenEnterRequest}
  //       requestFullscreenExit={this._onFullscreenExitRequest}
  //       {...this.state}
  //     />
  //   );
  }

  render() {
    const { width, height, src, ...restProps } = this.props;
    const wrapperCx = cx('react-video', {
      'react-video-fullscreen': this.state.fullscreen
    });
    return (
      <div ref="player" className={wrapperCx} style={{...{}, width, height}}>
        <Video
          ref="video"
          src={src} width={width} height={height}
          metadataLoaded={this._setMetadata}
          onDownloadProgress={this._setDownloadProgress}
          currentTimeChanged={this._setCurrentTimeFromVideo}
          onEnd={this._onEnd}
          {...restProps}
        />
        { this._renderControls() }
      </div>
    );
  }
};
