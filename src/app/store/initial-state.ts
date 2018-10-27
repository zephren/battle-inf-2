import { createItem } from "../interfaces/ItemData";
import IState from "../interfaces/State";
import CCharacter from "../classes/Character";

export default (): IState => {
  return {
    heroes: [CCharacter.createHero()],
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
      lastTick: Date.now(),
      buildings: {
        housing: {
          quantity: 3,
          data: {}
        },
        sawmill: {
          quantity: 1,
          data: {}
        },
        inn: {
          quantity: 1,
          data: {
            lastTick: Date.now()
          }
        }
      },
      jobAssignments: {
        woodcutter: 0
      },
      resources: {
        wood: 10
      }
    },
    mapState: {},
    newItemActionCode: "console.log(item)"
  };
};
