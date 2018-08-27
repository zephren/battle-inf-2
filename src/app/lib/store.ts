import * as React from "react";
import IHero from "../interfaces/Hero";

interface State {
  heroes?: IHero[];
}

let topLevelComponent: React.Component = null;
let state: State = {};

class Store {
  constructor(initialState: State) {
    if (initialState) {
      state = initialState;
    }
  }

  setTopLevelComponent(component: React.Component) {
    topLevelComponent = component;
  }

  getState() {
    return state;
  }

  update() {
    topLevelComponent.setState({});
  }

  forceUpdate() {
    topLevelComponent.forceUpdate();
  }
}

const initialState = {
  heroes: [{ name: "Hero 0" }, { name: "Hero 1" }, { name: "Hero 2" }]
};
const store = new Store(initialState);

//window.state = store.getState();

export default store;
