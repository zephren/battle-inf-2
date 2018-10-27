import Store from "../store";
import jobs from "../config/jobs";
import buildings from "../config/buildings";

const town = Store.getState().town;

function processJob(jobId: string, quantity: number) {
  jobs[jobId].tick(town, quantity);
}

function tick() {
  if (town.lastTick + 60000 < Date.now()) {
    town.lastTick = Date.now();

    for (const jobId in town.jobAssignments) {
      processJob(jobId, town.jobAssignments[jobId]);
    }

    Store.update();

    Store.saveState();
  }

  for (const buildingId in buildings) {
    const buildingConfig = buildings[buildingId];
    const building = town.buildings[buildingId];

    if (
      buildingConfig.tickTime &&
      building.data.lastTick &&
      buildingConfig.processTick
    ) {
      if (building.data.lastTick + buildingConfig.tickTime < Date.now()) {
        building.data.lastTick = Date.now();
        buildingConfig.processTick(town, building);
      }
    }
  }

  setTimeout(tick, 1000);
}

setTimeout(tick);
