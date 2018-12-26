import Store from "../store";
import IItemData from "../interfaces/ItemData";
import LogActions from "./log-actions";
import ItemActions from "./item-actions";
import CCharacter from "../classes/Character";
import GameFunctions from "../lib/game-functions";
import Values from "../config/values";

const GameActions = {
  addItemToInventory: (item: IItemData, force: boolean = false) => {
    const state = Store.getState();
    const inventory = state.inventory;
    const heroes = state.heroes;

    const getHero = (index: number) => {
      return JSON.parse(JSON.stringify(heroes[index]));
    };

    const equip = (heroData: any, item: any) => {
      const hero = GameFunctions.getHeroById(heroData.data.id);

      ItemActions.equip.action(hero, item);
    };

    if (inventory.length < Values.inventorySize() || force) {
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

      itemFunction(item);

      Store.saveState();

      Store.update();
    } else {
      LogActions.addText(`:i:Inventory is full:i:`);
    }
  },

  recruitHero(hero: CCharacter) {
    const state = Store.getState();
    const town = state.town;
    const heroes = state.heroes;

    if (GameFunctions.townHasFreeHousing()) {
      heroes.push(hero);

      const index = town.buildings.inn.data.heroes.indexOf(hero);
      town.buildings.inn.data.heroes.splice(index, 1);

      Store.update();
    }
  }
};

export default GameActions;
