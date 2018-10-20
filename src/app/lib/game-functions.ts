import Store from "./store";
import map from "../config/map";

export default {
  getHeroById: (id: string) => {
    const state = Store.getState();
    const heroes = state.heroes;

    for (const hero of heroes) {
      if (hero.data.id === id) {
        return hero;
      }
    }

    return null;
  },

  getMapLocationByName: (name: string) => {
    for (const location of map.nodes) {
      if (location.name === name) {
        return location;
      }
    }

    return null;
  }
};
