import { h } from 'snabbdom';

const createElement = (type, props = {}, ...children) => {
  return h(type, { props }, children);
};

export default createElement;