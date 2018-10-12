import { createItem } from "../interfaces/ItemData";
import CHero from "../classes/Hero";

import IState from "../interfaces/State";

export default (): IState => {
  return {
    heroes: [new CHero(), new CHero(), new CHero()],
    inventory: [
      createItem(),
      createItem(),
      createItem(),
      createItem({ type: "hand", subType: "sword" }),
      createItem({ type: "hand", subType: "sword", rarity: 5 }),
      createItem({
        type: "hand",
        subType: "twoHandedSword",
        rarity: 4
      })
    ],
    properties: {
      inventorySize: 10
    },
    log: [],
    scrollLogToBottom: false,
    town: {
      buildings: {}
    },
    newItemActionCode: "console.log(item)"
  };
};
