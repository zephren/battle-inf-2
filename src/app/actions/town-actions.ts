import Store from "../store";
import GameFunctions from "../lib/game-functions";
import jobs from "../config/jobs";
import buildings from "../config/buildings";
import IBuildingData from "../interfaces/BuildingData";

function setupBuilding(): IBuildingData {
  return {
    size: 0,
    quality: 0,
    data: {}
  };
}

function getBuilding(town: any, buildingId: string): IBuildingData {
  if (!town.buildings[buildingId]) {
    town.buildings[buildingId] = setupBuilding();
  }

  return town.buildings[buildingId];
}

function removeTownResources(town: any, cost: any) {
  for (const resourceId in cost) {
    const resourceCost = cost[resourceId];

    town.resources[resourceId] -= resourceCost;
  }
}

export default {
  upgradeBuilding: (buildingId: string) => {
    const town = Store.getState().town;
    const building = buildings[buildingId];
    const buildingData = getBuilding(town, buildingId);

    if (GameFunctions.canAffordBuildingUpgrade(buildingId, buildingData)) {
      buildingData.quality += 1;

      removeTownResources(town, building.upgradeCost(buildingData));

      Store.saveState();
    }

    Store.update();
  },

  expandBuilding: (buildingId: string) => {
    const town = Store.getState().town;
    const building = buildings[buildingId];
    const buildingData = getBuilding(town, buildingId);

    if (GameFunctions.canAffordBuildingExpand(buildingId, buildingData)) {
      buildingData.size += 1;

      removeTownResources(town, building.expandCost(buildingData));

      Store.saveState();
    }

    Store.update();
  },

  assignToJob(jobId: string) {
    const town = Store.getState().town;
    const job = jobs[jobId];

    if (job.canAssign(town)) {
      if (!town.jobAssignments[jobId]) {
        town.jobAssignments[jobId] = 0;
      }

      town.jobAssignments[jobId]++;
      Store.update();
    }
  },

  unassignFromJob(jobId: string) {
    const town = Store.getState().town;

    if (town.jobAssignments[jobId] > 0) {
      town.jobAssignments[jobId]--;
      Store.update();
    }
  }
};
