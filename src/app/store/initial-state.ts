import { createItem } from "../interfaces/ItemData";
import IState from "../interfaces/State";
import CCharacter from "../classes/Character";

export default (): IState => {
  return {
    heroes: [
      CCharacter.createHero(null, {
        potentialRange: [0.05, 0.1]
      })
    ],
    inventory: [
      // createItem(),
      // createItem({ type: "hand", subType: "sword" }),
      // createItem({ type: "hand", subType: "sword", rarity: 5 }),
    ],
    log: [],
    scrollLogToBottom: false,
    town: {
      lastTick: Date.now(),
      buildings: {
        housing: {
          size: 3,
          quality: 1,
          data: {}
        },
        inn: {
          size: 1,
          quality: 1,
          data: {
            lastTick: Date.now()
          }
        },
        sawmill: {
          size: 1,
          quality: 1,
          data: {}
        },
        storage: {
          size: 10,
          quality: 1,
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
