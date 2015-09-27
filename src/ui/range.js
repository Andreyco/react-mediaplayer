"use strict";

import React, { Component, PropTypes} from 'react';

class UIRange extends Component {

  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleChange);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown(event) {
    this.props.beforeChange();
    this.handleChange(event);
    document.addEventListener('mousemove', this.handleChange);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp(event) {
    this.props.afterChange();
    document.removeEventListener('mousemove', this.handleChange);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleChange(event) {
    // Compute value from mouse x-coordinate relative to Range element.
    const { width, left } = this.refs.timeline.getBoundingClientRect();
    const xCoord = event.pageX - left;
    const value = Math.max(0, Math.min(1, xCoord / width)) * this.props.max;

    this.props.onChange(value);
  }

  render() {
    const { value, max } = this.props;
    const width = max === 0 ? 0 : value / max * 100 + '%';

    return (
      <div ref="timeline" style={{background: 'red', height: 10}} onMouseDown={this.handleMouseDown}>
        <div style={{background: 'green', width, height: 10, position: 'relative'}}>
          <div style={{width: 20, height: 20, position: 'absolute', top: -5, right: -10, background: 'rgba(0, 0, 0, .5)'}} />
        </div>
      </div>
    );
  }
}

UIRange.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  afterChange: PropTypes.func.isRequired,
  beforeChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default UIRange;
