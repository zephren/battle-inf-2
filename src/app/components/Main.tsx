import * as React from "react";
import Store from "../store";

import Log from "./Log";
import Header from "./Header";
import Heroes from "./Heroes";
import HeroActions from "./HeroActions";
import HeroEquipment from "./HeroEquipment";
import HeroSkills from "./HeroSkills";
import Inventory from "./Inventory";
import Options from "./Options";
import Map from "./Map";
import NewItemAction from "./NewItemAction";
import Town from "./Town";

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

    Store.setTopLevelComponent(this);
  }

  render() {
    return (
      <Router>
        <div className="animations">
          <Log />
          <div className="main">
            <Header />

            <div id="main-content" className="main-content">
              <Route exact path="/heroes" component={Heroes} />
              <Route
                exact
                path="/heroes/:index/equipment"
                component={HeroEquipment}
              />
              <Route
                exact
                path="/heroes/:index/skills"
                component={HeroSkills}
              />
              <Route
                exact
                path="/heroes/:index/actions"
                component={HeroActions}
              />
              <Route exact path="/inventory" component={Inventory} />
              <Route
                exact
                path="/inventory/newItemAction"
                component={NewItemAction}
              />
              <Route path="/map" render={props => <Map />} />
              <Route exact path="/town" component={Town} />
              <Route exact path="/town/:buildingId" component={Town} />
              <Route path="/options" component={Options} />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
