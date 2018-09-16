import * as React from "react";
import initialState from "./initial-state";
import IState from "../interfaces/State";
import CHero from "../classes/Hero";
import GameActions from "./game-actions";
import gameActions from "./game-actions";

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

const reset = false;

if (!existingState || reset) {
  // Start a new game
  store.setFullState(initialState);

  // Immediately save the state
  localStorage.setItem("saveState", JSON.stringify(state));
} else if (existingState) {
  // Load an existing game
  const heroes = [];

  for (const heroData of existingState.heroes) {
    const hero = new CHero(heroData.data);

    hero.updateTotalStats();

    heroes.push(hero);
  }

  const newState = {
    heroes: heroes,
    inventory: existingState.inventory,
    log: existingState.log
  };

  store.setFullState(newState);
}

if (!state.log) {
  state.log = [];
}

// Best way to set a property on the window
(<any>window).state = state;

export default store;
