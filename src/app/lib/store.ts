import * as React from "react";
import initialState from "./initial-state";
import IState from "../interfaces/State";
import CHero from "../classes/Hero";

let topLevelComponent: React.Component = null;
let state: IState = {};

class Store {
  setTopLevelComponent(component: React.Component) {
    topLevelComponent = component;
  }

  setFullState(newState: IState) {
    if (newState) {
      state = newState;
    }
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

const existingState: IState = JSON.parse(localStorage.getItem("saveState"));
const store = new Store();

if (existingState) {
  const heroes = [];

  for (const heroData of existingState.heroes) {
    heroes.push(new CHero(heroData.data));
  }

  const newState = {
    heroes: heroes,
    inventory: existingState.inventory,
    log: existingState.log
  };

  store.setFullState(newState);
} else {
  store.setFullState(initialState);
}

if (!state.log) {
  state.log = [];
}

// Best way to set a property on the window
(<any>window).state = state;

export default store;
