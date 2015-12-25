import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { on, off } from '../../helpers/event';
import { getValue, getOnChangeHandler, decrement, increment, valueFromMousePosition } from './helpers';
import Track from './Track';
import {
  wrapper as wrapperStyle,
  thumb as thumbStyle,
  nativeInputStyle,
  input as inputStyle,
} from './styles';

const DECREMENT = 37;
const INCREMENT = 39;

const InputRange = createClass({
  propTypes: {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    value: PropTypes.number,
    valueLink: PropTypes.shape({
      value: PropTypes.number.isRequired,
      requestChange: PropTypes.func.isRequired,
    }),
    onChange: PropTypes.func,
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

  shouldComponentUpdate(nextProps) {
    const { min, max, step } = this.props;
    return getValue(this.props) !== getValue(nextProps)
      || nextProps.min !== min
      || nextProps.max !== max
      || nextProps.step !== step;
  },

  executeOnInput(value) {
    this.state.value = value;
    this.props.onInput(value);
  },

  executeOnChange() {
    getOnChangeHandler(this.props)(this.state.value);
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
    this.executeOnChange();
  },

  onMouseMove(event) {
    const value = valueFromMousePosition(event, findDOMNode(this.refs.track), this.props);
    this.executeOnInput(value);
  },

  onKeyPress(event) {
    let value = this.state.value;

    if (event.which === INCREMENT) value = increment(value, this.props);

    if (event.which === DECREMENT) value = decrement(value, this.props);

    if (value !== this.state.value) {
      this.executeOnInput(value);
      this.executeOnChange();
    }
  },

  focusHiddenInput() {
    this.refs.hiddenInput.focus();
  },

  render() {
    const { max } = this.props;
    const value = Math.min(getValue(this.props), max);

    const props = {
      style: {
        ...thumbStyle,
        left: (value / max) * 100 + '%',
      },
    };

    return (
      <div style={nativeInputStyle}>
        <div style={wrapperStyle} onMouseDown={this.onMouseDown}>
          <Track ref="track" max={max} value={value} />
          <div {...props} />
          <input ref="hiddenInput" value={""} onKeyDown={this.onKeyPress} style={inputStyle} />
        </div>
      </div>
    );
  },
});

export default InputRange;
