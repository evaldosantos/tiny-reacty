import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';

const h = snabbdom.h;

// propsModule -> this helps in patching text attributes
const reconcile = snabbdom.init([propsModule, eventlistenersModule]);

const createElement = (type, props = {}, ...children) => {

  let dataProps = {};
  let eventProps = {};
  
  // if type is a Class then
  // 1. create a instance of the Class
  // 2. call the render method on the Class instance
  if (type.prototype && type.prototype.isClassComponent) {
    const componentInstance = new type(props);

    // remember the current vNode instance
    componentInstance.__vNode = componentInstance.render();

    // add hook to snabbdom virtual node to know whether it was added to the actual DOM
    componentInstance.__vNode.data.hook = {
      create: () => {
        componentInstance.componentDidMount()
      }
    }

    return componentInstance.__vNode;
  }
  // if type is a function then call it and return it's value
  if (typeof (type) == 'function') {
    return type(props);
  }

  props = props || {};

  // This is to seperate out the text attributes and event listener attributes
  for(let propKey in props) {
    // event props always startwith on eg. onClick, onChange etc.
    if (propKey.startsWith('on')) {
      // onClick -> click
      const event = propKey.substring(2).toLowerCase();

      eventProps[event] = props[propKey];
    }
    else {
      dataProps[propKey] = props[propKey];
    }
  }

  // props -> snabbdom's internal text attributes
  // on -> snabbdom's internal event listeners attributes
  return h(type, { props: dataProps, on: eventProps }, children);
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

  // reference https://overreacted.io/how-does-setstate-know-what-to-do/
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

reacty.__updater = (componentInstance) => {
  // logic on how to update the DOM when you call this.setState

  // get the oldVNode stored in __vNode
  const oldVNode = componentInstance.__vNode;
  // find the updated DOM node by calling the render method
  const newVNode = componentInstance.render();

  // update the __vNode property with updated __vNode
  componentInstance.__vNode = reconcile(oldVNode, newVNode);
}

export default reacty;