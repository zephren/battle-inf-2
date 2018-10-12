import Store from "./store";
import IItemData from "../interfaces/ItemData";
import LogActions from "./log-actions";

const GameActions = {
  saveState: () => {
    localStorage.setItem("saveState", JSON.stringify(Store.getState()));
  },

  addItemToInventory: (item: IItemData, force: boolean = false) => {
    const state = Store.getState();
    const inventory = state.inventory;
    const properties = state.properties;
    const heroes = state.heroes;

    const getHero = (index: number) => {
      return JSON.parse(JSON.stringify(heroes[0]));
    };

    const equip = (character: any, item: any) => {
      console.log(character);
      console.log(item);
    };

    if (inventory.length < properties.inventorySize || force) {
      state.inventory.push(item);

      let itemFunction = (item: any): number => {
        return 0;
      };

      const KEEP = 0;
      const REJECT = 1;

      eval(`
        itemFunction = (item) => {
          const state = undefined;
          const inventory = undefined;
          const properties = undefined;

          ${state.newItemActionCode}

          return KEEP;
        }
      `);

      const result = itemFunction(JSON.parse(JSON.stringify(item)));

      // TODO: how to allow an item to be equipped to a hero?
      if (result === KEEP) {
      }

      GameActions.saveState();

      Store.update();
    } else {
      LogActions.addText(`:i:Inventory is full:i:`);
    }
  }
};

export default GameActions;
