import * as React from "react";
import createInitialState from "./initial-state";
import IState from "../interfaces/State";
import CHero from "../classes/Hero";
import IProperties from "../interfaces/Properties";
import initialState from "./initial-state";

let topLevelComponent: React.Component = null;
let state: IState = {};
let store: Store = null;

/**
 * This either sets up the state from localStorage or initializes a new state
 *
 * @param reset
 */
export function setupState(reset = false) {
  const existingState: IState = JSON.parse(localStorage.getItem("saveState"));
  const initialState = createInitialState();

  if (!existingState || reset) {
    // Immediately save the state
    localStorage.setItem("saveState", JSON.stringify(initialState));

    // Call again to fully setup the new state
    setupState();
  } else if (existingState) {
    // Load an existing game
    const heroes = [];

    if (!existingState.heroes) {
      existingState.heroes = initialState.heroes;
    }

    for (const heroData of existingState.heroes) {
      const hero = new CHero(heroData.data);

      hero.updateTotalStats();

      heroes.push(hero);
    }

    const properties = existingState.properties || <IProperties>{};

    properties.inventorySize =
      properties.inventorySize || initialState.properties.inventorySize;

    const newState = {
      heroes: heroes,
      inventory: existingState.inventory || initialState.inventory,
      log: existingState.log || initialState.log,
      town: existingState.town || initialState.town,
      properties: properties,
      newItemActionCode: existingState.newItemActionCode
    };

    store.setFullState(newState);
  }
}

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

store = new Store();

setupState();

if (!state.log) {
  state.log = [];
}

// Best way to set a property on the window
(<any>window).state = state;

export default store;
