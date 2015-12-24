import React, { createClass, PropTypes } from 'react';
import { on, off } from '../../helpers/event';
import {
  wrapper as wrapperStyle,
  track as trackStyle,
  thumb as thumbStyle,
  nativeInputStyle,
  input as inputStyle,
} from './styles';

import { decrement, increment, valueFromMousePosition } from './helpers';

const DECREMENT = 37;
const INCREMENT = 39;

// TODO support value link
const InputRange = createClass({
  propTypes: {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onInput: PropTypes.func,
  },

  getDefaultProps() {
    return {
      min: 0,
      max: 100,
      step: 1,
      value: 50,
    };
  },

  getInitialState() {
    return {};
  },

  componentWillUnmount() {
    this.onMouseUp();
  },

  onMouseDown(event) {
    on(document, 'mousemove', this.onMouseMove);
    on(document, 'mouseup', this.onMouseUp);
    this.onMouseMove(event);
  },

  onMouseUp() {
    off(document, 'mousemove', this.onMouseMove);
    off(document, 'mouseup', this.onMouseUp);
    this.focusHiddenInput();
    this.triggerChange();
  },

  onMouseMove(event) {
    const value = valueFromMousePosition(event, this.refs.range, this.props);
    this.triggerInput(value);
  },

  onKeyPress(event) {
    let value = this.state.value;

    if (event.which === INCREMENT) value = increment(value, this.props);

    if (event.which === DECREMENT) value = decrement(value, this.props);

    if (value !== this.state.value) {
      this.triggerInput(value);
      this.triggerChange();
    }
  },

  focusHiddenInput() {
    this.refs.hiddenInput.focus();
  },

  triggerInput(value) {
    this.state.value = value;
    this.props.onInput(value);
  },

  triggerChange() {
    this.props.onChange(this.state.value);
  },

  render() {
    const value = Math.min(this.props.value, this.props.max);

    const props = {
      style: {
        ...thumbStyle,
        left: (value / this.props.max) * 100 + '%',
      },
    };

    return (
      <div style={nativeInputStyle}>
        <div style={wrapperStyle} onMouseDown={this.onMouseDown}>
          <div style={trackStyle} ref="range"/>
          <div {...props} />
          <input ref="hiddenInput" value={""} onKeyDown={this.onKeyPress} style={inputStyle} />
        </div>
      </div>
    );
  },
});

export default InputRange;
