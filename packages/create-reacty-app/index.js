import reacty from '../reacty';

// functional component to welcome someone
const Greeting = ({ name }) => <p>Welcome {name}!</p>;

const App = (
  <div>
    <h1 className="primary">
      reacty is quick and dirty react
    </h1>
    <Greeting name="Guest" />
  </div>
);

reacty.render(App, document.getElementById('root'));
reacty.render(App, document.getElementById('root'));