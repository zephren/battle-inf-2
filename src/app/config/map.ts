import battleConfigs from "./battle-configs";
import enemyTypes from "./enemy-types";
import Store from "../lib/store";
import MapActions from "../lib/map-actions";

const mapState = Store.getState().mapState;

export default {
  nodes: [
    {
      name: "Town",
      isAvailable: () => {
        return true;
      },
      connectsTo: ["Plains 1-1", "Forest 1-1"]
    },
    {
      name: "Plains 1-1",
      isAvailable: () => {
        return true;
      },
      connectsTo: ["Plains 1-2"],
      battleConfig: {
        type: battleConfigs.standard,
        enemyTypes: [enemyTypes.Rat],
        enemyCount: [1, 1],
        enemyModifier: 1,
        onWin: () => {
          MapActions.incrementValue("Plains 1-1 Completions");
          Store.update();
        }
      }
    },
    {
      name: "Plains 1-2",
      isAvailable: () => {
        return MapActions.getValue("Plains 1-1 Completions") > 0;
      },
      connectsTo: ["Plains 1-3"],
      battleConfig: {
        type: battleConfigs.standard,
        enemyTypes: [enemyTypes.Rat],
        enemyCount: [3, 3],
        enemyModifier: 2,
        onWin: () => {
          MapActions.incrementValue("Plains 1-2 Completions");
          Store.update();
        }
      }
    },
    {
      name: "Plains 1-3",
      isAvailable: () => {
        return MapActions.getValue("Plains 1-2 Completions") > 0;
      },
      battleConfig: {}
    },
    {
      name: "Forest 1-1",
      isAvailable: () => {
        return true;
      },
      connectsTo: ["Forest 1-2"],
      battleConfig: {}
    },
    {
      name: "Forest 1-2",
      isAvailable: () => {
        return false;
      },
      battleConfig: {}
    }
  ]
};
