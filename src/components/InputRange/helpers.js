/**
 * Round value to precision of given step.
 */
const precision = value => {
  const decimalPart = value.toString().split('.')[1] || '';
  return decimalPart.length;
};

const toPrecision = (value, digits) => {
  return parseFloat(value.toFixed(digits));
};


/**
 * Compute value from mouse position in Track element.
 */
export const valueFromMousePosition = (event, target, { max, step }) => {
  const rect = target.getBoundingClientRect();

  let left = Math.min(rect.width, event.clientX - rect.left);
  left = Math.max(0, left);

  const value = left / rect.width * max;

  return toPrecision(value, precision(step));
};


/**
 * Increment value. Keep constraints.
 */
export const increment = (value, {max, step}) => {
  const newValue = toPrecision(value + step, precision(step));
  return Math.min(max, newValue);
};


/**
 * Decrement value. Keep constraints.
 */
export const decrement = (value, {min, step}) => {
  const newValue = toPrecision(value - step, precision(step));
  return Math.max(min, newValue);
};

/**
 * Get `value` from given props.
 */
export const getValue = ({valueLink, value}) => {
  return valueLink ? valueLink.value : value;
};

/**
 * Get `onChange` from given props.
 */
export const getOnChangeHandler = ({valueLink, onChange}) => {
  return valueLink ? valueLink.requestChange : onChange;
};
