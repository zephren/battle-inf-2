import Store from "./store";
import GameActions from "./game-actions";

export default {
  buildBuilding: (buildingId: string) => {
    const town = Store.getState().town;
    let building = town.buildings[buildingId];

    if (!building) {
      building = {
        quantity: 0
      };

      town.buildings[buildingId] = building;
    }

    if (true) {
      building.quantity += 1;

      GameActions.saveState();
    }

    Store.update();
  }
};
