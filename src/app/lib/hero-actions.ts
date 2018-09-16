import Store from "./store";
import CHero from "../classes/Hero";

export default {
  removeHero: (hero: CHero) => {
    const state = Store.getState();

    const index = state.heroes.indexOf(hero);
    state.heroes.splice(index, 1);

    Store.update();
  }
};
