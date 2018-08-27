import * as React from "react";

import Log from "./Log";
import Header from "./Header";
import Heroes from "./Heroes";
import HeroEquipment from "./HeroEquipment";
import Inventory from "./Inventory";
import Town from "./Town";
import Options from "./Options";

import { HashRouter as Router, Route, Link } from "react-router-dom";

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }: any) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const Topics = ({ match }: any) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Main extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <Log />
        <div className="main">
          <Router>
            <div>
              <Header />

              <Route exact path="/heroes" component={Heroes} />
              <Route
                exact
                path="/heroes/:index/equipment"
                component={HeroEquipment}
              />
              <Route exact path="/inventory" component={Inventory} />
              <Route path="/town" component={Town} />
              <Route path="/options" component={Options} />
            </div>
          </Router>
        </div>
      </div>
    );
  }
}
