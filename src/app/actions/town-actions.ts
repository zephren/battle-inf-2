import Store from "../store";
import GameFunctions from "../lib/game-functions";
import jobs from "../config/jobs";
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

export default {
  upgradeBuilding: (buildingId: string) => {
    const town = Store.getState().town;
    const building = getBuilding(town, buildingId);

    if (GameFunctions.canAffordBuildingUpgrade(buildingId, building)) {
      building.quality += 1;

      Store.saveState();
    }

    Store.update();
  },

  expandBuilding: (buildingId: string) => {
    const town = Store.getState().town;
    const building = getBuilding(town, buildingId);

    if (GameFunctions.canAffordBuildingExpand(buildingId, building)) {
      building.size += 1;

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
