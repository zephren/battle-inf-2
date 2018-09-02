import CHero from "../classes/Hero";
import CItem from "../classes/Item";
import Store from "./store";

export default {
  unequip: {
    name: "Unequip",
    action: (hero: CHero, item: CItem) => {
      const items = hero.unequip(item);
      const state = Store.getState();

      state.inventory = state.inventory.concat(items);
      console.log(state.inventory);
      Store.update();
    }
  },

  equip: {
    name: "Equip",
    action: (hero: CHero, item: CItem) => {
      const items = hero.equip(item);
      const state = Store.getState();

      const index = state.inventory.indexOf(item);
      state.inventory.splice(index, 1);

      state.inventory = state.inventory.concat(items);

      Store.update();
    }
  },

  sell: {
    name: "Sell",
    action: (hero: CHero, item: CItem) => {}
  }
};
