import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';

// propsModule -> this helps in patching text attributes
const reconcile = snabbdom.init([propsModule]);

const render = (el, rootDomElement) => {
  reconcile(rootDomElement, el);
}

export default render;