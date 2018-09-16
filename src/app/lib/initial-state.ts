import { createItem } from "../interfaces/ItemData";
import CHero from "../classes/Hero";

import IState from "../interfaces/State";

const initialState: IState = {
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
  log: [],
  scrollLogToBottom: false
};

export default initialState;
