import { h } from 'snabbdom';

const createElement = (type, props = {}, ...children) => {
  // if type is a Class then
  // 1. create a instance of the Class
  // 2. call the render method on the Class instance
  if (type.prototype && type.prototype.isClassComponent) {
    const componentInstance = new type(props);

    return componentInstance.render();
  }
  // if type is a function then call it and return it's value
  if (typeof (type) == 'function') {
    return type(props);
  }

  return h(type, { props }, children);
};

export default createElement;