import { h } from 'snabbdom';
import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';

// propsModule -> this helps in patching text attributes
const reconcile = snabbdom.init([propsModule]);

const createElement = (type, props = {}, ...children) => {
  // if type is a Class then
  // 1. create a instance of the Class
  // 2. call the render method on the Class instance
  if (type.prototype && type.prototype.isClassComponent) {
    const componentInstance = new type(props);

    // remember the current vNode instance
    componentInstance.__vNode = componentInstance.render();

    return componentInstance.__vNode;
  }
  // if type is a function then call it and return it's value
  if (typeof (type) == 'function') {
    return type(props);
  }

  return h(type, { props }, children);
};

const render = (function(reconcile) {
  

  // we need to maintain the latest rootVNode returned by render
  let rootVNode;

  return function(el, rootDomElement) {

    if(rootVNode == null) {
      rootVNode = rootDomElement;
    }

    // remember the VNode that reconcile returns
    rootVNode = reconcile(rootVNode, el);

  }
}(reconcile));

class Component {
  constructor() { }

  componentDidMount() { }

  setState(partialState) {
    // update the state by adding the partial state
    this.state = {
      ...this.state,
      ...partialState
    }
    // call the __updater function that QndReactDom gave
    reacty.__updater(this);
  }

  render() { }
}

// add a static property to differentiate between a class and a function
// reference https://overreacted.io/how-does-react-tell-a-class-from-a-function/
Component.prototype.isClassComponent = true;

const reacty = {
  name: 'reacty',
  createElement,
  Component,
  render
};

reacty.__updater = () => {

}

export default reacty;