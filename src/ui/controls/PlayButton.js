"use strict";

import React from 'react';
// const PureRenderMixin = require('react/addons').addons.PureRenderMixin;
const { PropTypes } = React;

let Video = React.createClass({

  propTypes: {
    paused: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  },

  // mixins: [PureRenderMixin],

  render() {
    return (<button className="videoplayer--play-btn" onClick={this.props.onClick}>
      { this.props.paused ? 'Play' : 'Pause' }
    </button>)
  },
});

module.exports = Video;
