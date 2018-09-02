import * as React from "react";
import initialState from "./initial-state";
import IState from "../interfaces/State";

let topLevelComponent: React.Component = null;
let state: IState = {};

class Store {
  constructor(initialState: IState) {
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

const store = new Store(initialState);

// Best way to set a property on the window
(<any>window).state = store.getState();

export default store;
