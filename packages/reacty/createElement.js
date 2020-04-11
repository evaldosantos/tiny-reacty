import { h } from 'snabbdom';

const createElement = (type, props = {}, ...children) => {
  // if type is a function then call it and return it's value
  if (typeof (type) == 'function') {
    return type(props);
  }
  
  return h(type, { props }, children);
};

export default createElement;