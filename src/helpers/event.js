export function on(el, events, cb, capture = false) {
  events.split(' ').map(event => {
    if (event) el.addEventListener(event, cb, capture);
  });
}

// Unbind event listeners
export function off(el, events, cb, capture = false) {
  events.split(' ').map(event => {
    if (event) el.removeEventListener(event, cb, capture);
  });
}
