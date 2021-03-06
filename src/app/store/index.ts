import * as React from "react";
import createInitialState from "./initial-state";
import IState from "../interfaces/State";
import CCharacter from "../classes/Character";
import IProperties from "../interfaces/Properties";

let topLevelComponent: React.Component = null;
let state: IState = {};
let store: Store = null;

function initializeState(initialState: IState) {
  // Immediately save the state
  localStorage.setItem("saveState", JSON.stringify(initialState));

  // Call again to fully setup the new state
  setupState();
}

function loadState(initialState: IState, existingState: IState) {
  // Load an existing game
  const heroes = [];

  // Heroes
  if (!existingState.heroes) {
    existingState.heroes = initialState.heroes;
  }

  for (const heroData of existingState.heroes) {
    const hero = new CCharacter(heroData.data);

    hero.updateTotalStats();

    heroes.push(hero);
  }

  // Log records
  for (const record of existingState.log) {
    if (record.type === "character") {
      record.data.character = new CCharacter(record.data.character.data);
    }
  }

  const properties = existingState.properties || <IProperties>{};

  const newState = {
    heroes: heroes,
    inventory: existingState.inventory || initialState.inventory,
    log: existingState.log || initialState.log,
    town: existingState.town || initialState.town,
    properties: properties,
    newItemActionCode: existingState.newItemActionCode,
    currentLocation: existingState.currentLocation || "Town",
    mapState: existingState.mapState || {}
  };

  const innData = newState.town.buildings.inn.data;

  if (innData.heroes) {
    const innHeroes: CCharacter[] = [];

    for (const heroData of innData.heroes) {
      const hero = new CCharacter(heroData.data);

      hero.updateTotalStats();

      innHeroes.push(hero);
    }

    innData.heroes = innHeroes;
  }

  store.setFullState(newState);
}

/**
 * This either sets up the state from localStorage or initializes a new state
 *
 * @param reset
 */
export function setupState(reset = false) {
  const existingState: IState = JSON.parse(localStorage.getItem("saveState"));
  const initialState = createInitialState();

  if (!existingState || reset) {
    initializeState(initialState);
  } else if (existingState) {
    loadState(initialState, existingState);
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

  saveState() {
    localStorage.setItem("saveState", JSON.stringify(state));
    console.log("Game Saved!");
  }
}

store = new Store();

setupState();

if (!state.log) {
  state.log = [];
}

const w = <any>window;

// Best way to set a property on the window
w.store = store;
w.state = state;
w.setupState = setupState;

export default store;
