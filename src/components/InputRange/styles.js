const transform = (property) => ({
  WebkitTransform: property,
  MozTransform: property,
  msTransform: property,
  OTransform: property,
  transform: property,
});

/**
 * Main wrapper
 */
const wrapper = {
  height: 14,
  // overflow: 'hidden',
  position: 'relative',
  cursor: 'pointer',
  marginTop: 50,
};

export { wrapper };

/**
 * Track
 */
const track = {
  ...transform('translateY(-50%)'),
  position: 'absolute',
  top: '50%',
  width: '100%',
  height: 4,
  display: 'block',
  background: '#ccc',
};

export { track };

/**
 * Thumb
 */
const thumb = {
  width: 14,
  height: 14,
  position: 'relative',
  top: 0,
  left: 0,
  ...transform('translateX(-50%)'),
  borderRadius: '50%',
  background: '#666',
};

export { thumb };

/**
 * Inner input
 */
const input = {
  position: 'absolute',
  top: -10000,
  left: -10000,
  width: 0,
  height: 0,
  padding: 0,
  border: 0,
};

export { input };
