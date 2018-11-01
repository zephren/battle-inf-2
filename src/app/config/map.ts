import battleConfigs from "./battle-configs";
import enemyTypes from "./enemy-types";
import MapActions from "../actions/map-actions";

let map: any = null;

function buildMap(mapState: any) {
  return {
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
          enemyLevelRange: [1, 1],
          enemyMod: 1,
          onWin: () => {
            MapActions.incrementValue("Plains 1-1 Completions");
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
          enemyLevelRange: [2, 3],
          enemyMod: 2,
          onWin: () => {
            MapActions.incrementValue("Plains 1-2 Completions");
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
}

export default function(mapState?: any) {
  if (map) {
    return map;
  }

  map = buildMap(mapState);

  return map;
}
