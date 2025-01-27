import reacty from '../reacty';

// functional component to welcome someone
const Greeting = ({ name }) => <p>Welcome {name}!</p>;

class Counter extends reacty.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count} <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>Increment</button></p>
        
      </div>
    )
  }
}

const App = (
  <div>
    <h1 className="primary">
      reacty is quick and dirty react
    </h1>
    <Greeting name="Guest" />
    <Counter />
  </div>
);

reacty.render(App, document.getElementById('root'));
reacty.render(App, document.getElementById('root'));