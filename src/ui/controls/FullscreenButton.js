"use strict";

import React from 'react';

const { PropTypes } = React;

function enterFullscreen(element)
{
  console.log(element);
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen(element)
{

}


export class FullscreenButton extends React.Component {

  displayName = "FullscreenButton"

  static propTypes = {
    requestFullscreenEnter: PropTypes.func.isRequired,
    requestFullscreenExit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isInFullscreen: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {

    if(this.state.isInFullscreen) {
      exitFullscreen(React.findDOMNode(this.props.video));
    } else {
      enterFullscreen(React.findDOMNode(this.props.video));
    }
    //
    // this.setState({isInFullscreen: ! this.setState.isInFullscreen});
  }

  render() {
    return (
      <button className="videoplayer--fullscreen-btn" onClick={this.onClick}>
        Go fullscreen
      </button>
    );
  }
}


  //

  //
  // handleClick() {
  //   console.log('click');
  // },
  //
  // render() {

  // },

module.exports = FullscreenButton;
