"use strict";

// Bind event listeners to target.
export function on (target, eventName, listener, capture = false) {
  return target.addEventListener(eventName, listener, capture);
}

// Unbind event listeners
export function off (target, eventName, listener, capture = false) {
  target.removeEventListener(eventName, listener, capture);
}

// "No operation" function.
export function noop () {}

export function fullscreenElement () {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
}

export function fullscreenEnabled () {
  return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
}

// Request fullscreen for given element.
export function enterFullscreen (element)
{
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

// Exit fullscreen
export function exitFullscreen ()
{
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if(document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
