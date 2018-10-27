import CCharacter from "../classes/Character";
import IItemData from "../interfaces/ItemData";
import Store from "../store";

export default {
  unequip: {
    name: "Unequip",
    action: (hero: CCharacter, item: IItemData) => {
      const items = hero.unequip(item);
      const state = Store.getState();

      state.inventory = state.inventory.concat(items);

      hero.updateTotalStats();

      Store.update();

      Store.saveState();
    }
  },

  equip: {
    name: "Equip",
    action: (hero: CCharacter, item: IItemData) => {
      const items = hero.equip(item);
      const state = Store.getState();

      const index = state.inventory.indexOf(item);
      state.inventory.splice(index, 1);

      state.inventory = state.inventory.concat(items);

      hero.updateTotalStats();

      Store.update();

      Store.saveState();
    }
  },

  drop: {
    name: "Drop",
    action: (hero: CCharacter, item: IItemData) => {
      const state = Store.getState();

      const index = state.inventory.indexOf(item);
      state.inventory.splice(index, 1);

      Store.update();

      Store.saveState();
    }
  }
};
