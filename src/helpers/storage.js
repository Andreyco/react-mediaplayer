/**
 * Shim in-memory Storage
 */
let instance;

const createShim = () => {
  let store = {};

  if (!instance) {
    instance = {
      setItem: (id, val) => store[id] = String(val),
      getItem: (id) => store.hasOwnProperty(id) ? store[id] : undefined,
      removeItem: (id) => delete store[id],
      clear: () => store = {},
    };
  }

  return instance;
};

// Having native support for LocalStorage? If so, use it. Otherwise use shim
// with in-memory storage (bye bye persistence).
const Storage = 'localStorage' in window && window.localStorage !== null
  ? window.localStorage
  : createShim();

/**
 * Make single storage methods exportable.
 */
export default {
  setItem: (...args) => Storage.setItem(...args),
  getItem: (...args) => Storage.getItem(...args),
  removeItem: (...args) => Storage.removeItem(...args),
  clear: (...args) => Storage.clear(...args),
};
