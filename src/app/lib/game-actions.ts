import Store from "./store";
import IItemData from "../interfaces/ItemData";
import LogActions from "./log-actions";
import ItemActions from "./item-actions";
import CHero from "../classes/Hero";
import gameFunctions from "./game-functions";

const GameActions = {
  saveState: () => {
    localStorage.setItem("saveState", JSON.stringify(Store.getState()));
    console.log("Game Saved!");
  },

  addItemToInventory: (item: IItemData, force: boolean = false) => {
    const state = Store.getState();
    const inventory = state.inventory;
    const properties = state.properties;
    const heroes = state.heroes;

    const getHero = (index: number) => {
      return JSON.parse(JSON.stringify(heroes[index]));
    };

    const equip = (heroData: any, item: any) => {
      console.log(heroData);
      console.log(item);

      const hero = gameFunctions.getHeroById(heroData.data.id);

      ItemActions.equip.action(hero, item);

      console.log(hero);
    };

    if (inventory.length < properties.inventorySize || force) {
      state.inventory.push(item);

      let itemFunction = (item: any): number => {
        return 0;
      };

      eval(`
        itemFunction = (item) => {
          const state = undefined;
          const inventory = undefined;
          const properties = undefined;

          ${state.newItemActionCode}
        }
      `);

      GameActions.saveState();

      Store.update();
    } else {
      LogActions.addText(`:i:Inventory is full:i:`);
    }
  }
};

export default GameActions;
