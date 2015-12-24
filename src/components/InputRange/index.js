import React, { createClass, PropTypes } from 'react';
import { on, off } from '../../helpers/event';
import {
  wrapper as wrapperStyle,
  track as trackStyle,
  thumb as thumbStyle,
  input as inputStyle,
} from './styles';

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
  },

  onMouseMove(event) {
    this.state.value = this.valueFromMousePosition(event, this.refs.range);
    this.props.onInput(this.state.value);
  },

  onKeyPress(event) {
    let value = this.state.value;

    if (event.which === INCREMENT) {
      value = Math.min(this.props.max, value + this.props.step);
    }

    if (event.which === DECREMENT) {
      value = Math.max(this.props.min, value - this.props.step);
    }

    if (value !== this.state.value) {
      this.state.value = value;
      this.commit();
    }
  },

  focusHiddenInput() {
    this.refs.hiddenInput.focus();
  },

  valueFromMousePosition(event, target) {
    const rect = target.getBoundingClientRect();

    let left = Math.min(rect.width, event.clientX - rect.left);
    left = Math.max(0, left);

    const value = left / rect.width * this.props.max;
    return Math.round(value / this.props.step) * this.props.step;
  },

  commit() {
    this.props.onChange(this.state.value);
    this.onMouseUp();
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
      <div style={wrapperStyle} onMouseDown={this.onMouseDown}>
        <div style={trackStyle} ref="range" />
        <div {...props} />
        <input ref="hiddenInput" value={""} onKeyDown={this.onKeyPress} style={inputStyle} />
      </div>
    );
  },
});

export default InputRange;
