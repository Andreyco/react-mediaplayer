import React, { createClass, PropTypes } from 'react';
import { handle as handleStyle, wrapper as wrapperStyle } from './styles';

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
    this.stopRespondingToMouseActions();
  },

  startRespondingToMouseActions() {
    document.addEventListener('mousemove', this.move);
    document.addEventListener('mouseup', this.commit);
  },

  stopRespondingToMouseActions() {
    document.removeEventListener('mousemove', this.move);
    document.removeEventListener('mouseup', this.commit);
  },

  computeValue(event, target) {
    const rect = target.getBoundingClientRect();

    let left = Math.min(rect.width, event.clientX - rect.left);
    left = Math.max(0, left);

    const value = left / rect.width * this.props.max;
    return Math.round(value / this.props.step) * this.props.step;
  },

  move(event) {
    this.state.value = this.computeValue(event, this.refs.range);
    this.props.onInput(this.state.value);
  },

  jump(event) {
    this.state.value = this.computeValue(event, event.target);
    this.props.onChange(this.state.value);
  },

  commit() {
    this.props.onChange(this.state.value);
    this.stopRespondingToMouseActions();
  },

  render() {
    const value = Math.min(this.props.value, this.props.max);

    const props = {
      onMouseDown: this.startRespondingToMouseActions,
      onClick: event => event.stopPropagation(),
      style: {
        ...handleStyle,
        left: (value / this.props.max) * 100 + '%',
      },
    };

    return (
      <div style={wrapperStyle} ref="range" onClick={this.jump}>
        <div ref="handle" {...props} />
      </div>
    );
  },
});

export default InputRange;
