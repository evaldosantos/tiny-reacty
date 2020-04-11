import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';

// propsModule -> this helps in patching text attributes
const reconcile = snabbdom.init([propsModule]);

// we need to maintain the latest rootVNode returned by render
let rootVNode;

const render = (el, rootDomElement) => {

  if(rootVNode == null) {
    rootVNode = rootDomElement;
  }

  // remember the VNode that reconcile returns
  rootVNode = reconcile(rootVNode, el);

}

export default render;