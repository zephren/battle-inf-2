import Store from "./store";
import GameActions from "./game-actions";
import GameFunctions from "./game-functions";
import jobs from "../config/jobs";

export default {
  upgradeBuilding: (buildingId: string) => {
    const town = Store.getState().town;
    let building = town.buildings[buildingId];

    if (!building) {
      building = {
        quantity: 0,
        data: {}
      };

      town.buildings[buildingId] = building;
    }

    if (GameFunctions.canAffordBuilding(buildingId, building.quantity)) {
      building.quantity += 1;

      GameActions.saveState();
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
