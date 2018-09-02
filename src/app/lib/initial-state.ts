import CItem from "../classes/Item";
import CHero from "../classes/Hero";
import CItemCreationProperties from "../classes/ItemCreationProperties";

import IState from "../interfaces/State";

const initialState: IState = {
  heroes: [new CHero(), new CHero(), new CHero()],
  inventory: [
    new CItem(new CItemCreationProperties()),
    new CItem(new CItemCreationProperties()),
    new CItem(new CItemCreationProperties()),
    new CItem(new CItemCreationProperties({ type: "hand", subType: "sword" })),
    new CItem(
      new CItemCreationProperties({ type: "hand", subType: "sword", rarity: 5 })
    ),
    new CItem(
      new CItemCreationProperties({
        type: "hand",
        subType: "twoHandedSword",
        rarity: 4
      })
    )
  ]
};

export default initialState;
