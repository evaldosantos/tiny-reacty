// component base class
class Component {
  constructor() { }

  componentDidMount() { }

  setState(partialState) { }

  render() { }
}

// add a static property to differentiate between a class and a function
// reference https://overreacted.io/how-does-react-tell-a-class-from-a-function/
Component.prototype.isClassComponent = true;

export default Component