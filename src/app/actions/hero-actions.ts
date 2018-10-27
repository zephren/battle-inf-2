import Store from "../store";
import CCharacter from "../classes/Character";

export default {
  removeHero: (hero: CCharacter) => {
    const state = Store.getState();

    const index = state.heroes.indexOf(hero);
    state.heroes.splice(index, 1);

    Store.update();
  }
};
