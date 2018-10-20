import CHero from "../classes/Hero";
import IItemData from "../interfaces/ItemData";
import Store from "./store";
import GameActions from "./game-actions";

export default {
  unequip: {
    name: "Unequip",
    action: (hero: CHero, item: IItemData) => {
      console.log(hero);
      const items = hero.unequip(item);
      const state = Store.getState();

      state.inventory = state.inventory.concat(items);

      hero.updateTotalStats();

      Store.update();

      GameActions.saveState();
    }
  },

  equip: {
    name: "Equip",
    action: (hero: CHero, item: IItemData) => {
      const items = hero.equip(item);
      const state = Store.getState();

      const index = state.inventory.indexOf(item);
      state.inventory.splice(index, 1);

      state.inventory = state.inventory.concat(items);

      hero.updateTotalStats();

      Store.update();

      GameActions.saveState();
    }
  },

  drop: {
    name: "Drop",
    action: (hero: CHero, item: IItemData) => {
      const state = Store.getState();

      const index = state.inventory.indexOf(item);
      state.inventory.splice(index, 1);

      Store.update();

      GameActions.saveState();
    }
  }
};
