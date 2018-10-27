import Store from "../store";
import map from "../config/map";
import buildings from "../config/buildings";

const GameFunctions = {
  getHeroById: (id: string) => {
    const state = Store.getState();
    const heroes = state.heroes;

    for (const hero of heroes) {
      if (hero.data.id === id) {
        return hero;
      }
    }

    return null;
  },

  getMapLocationByName: (name: string) => {
    for (const location of map.nodes) {
      if (location.name === name) {
        return location;
      }
    }

    return null;
  },

  canAffordBuilding(buildingId: string, quantity: number) {
    const state = Store.getState();
    const town = state.town;
    const building = buildings[buildingId];
    const cost = building.cost(quantity);

    for (const resourceId in cost) {
      const resourceCost = cost[resourceId];

      if (town.resources[resourceId] < resourceCost) {
        return false;
      }
    }

    return true;
  },

  getTownResidentSpace() {
    const state = Store.getState();

    return state.town.buildings.housing.quantity - state.heroes.length;
  },

  getTownJobAssignmentCount() {
    const state = Store.getState();
    const town = state.town;
    let count = 0;

    for (let jobId in town.jobAssignments) {
      const assignementCount = town.jobAssignments[jobId];

      if (assignementCount) {
        count += assignementCount;
      }
    }

    return count;
  },

  addTownResource(resourceId: string, amount: number) {
    const state = Store.getState();
    const town = state.town;

    if (!town.resources[resourceId]) {
      town.resources[resourceId] = 0;
    }

    town.resources[resourceId] += amount;
  },

  removeTownResource(resourceId: string, amount: number) {
    const state = Store.getState();
    const town = state.town;

    if (!town.resources[resourceId]) {
      town.resources[resourceId] = 0;
    }

    const newAmount = town.resources[resourceId] - amount;

    if (newAmount < 0) {
      const removedAmount = town.resources[resourceId];
      town.resources[resourceId] = 0;

      // Since newAMount is negative, the different is how many were removed
      return removedAmount;
    }

    town.resources[resourceId] = newAmount;

    return amount;
  },

  townUnusedHousingCount() {
    const state = Store.getState();
    const town = state.town;
    const heroes = state.heroes;

    return (
      town.buildings.housing.quantity -
      (GameFunctions.getTownJobAssignmentCount() + heroes.length)
    );
  },

  townHasFreeHousing() {
    return this.townUnusedHousingCount() > 0;
  }
};

export default GameFunctions;
