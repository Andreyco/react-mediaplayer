const transform = (property) => ({
  WebkitTransform: property,
  MozTransform: property,
  msTransform: property,
  OTransform: property,
  transform: property,
});

const width = 129;
const height = 15;

/**
 * Native input style
 */
export const nativeInputStyle = {
  margin: 2,
  display: 'inline-block',
  width,
  height,
  marginTop: 50,
};

/**
 * Main wrapper
 */
export const wrapper = {
  position: 'relative',
  height: '100%',
};

/**
 * Track
 */
export const track = {
  position: 'absolute',
  top: (height - 5) / 2,
  width: '100%',
  height: 5,
  display: 'block',
  background: '#ccc',
  borderRadius: height / 2,
};

/**
 * Thumb
 */
export const thumb = {
  width: height,
  height: height,
  position: 'absolute',
  left: 0,
  ...transform('translateX(-50%)'),
  borderRadius: '50%',
  background: '#666',
};

/**
 * Inner input
 */
export const input = {
  position: 'absolute',
  top: -10000,
  left: -10000,
  width: 0,
  height: 0,
  padding: 0,
  border: 0,
};
