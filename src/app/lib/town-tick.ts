import Store from "./store";
import jobs from "../config/jobs";
import gameActions from "./game-actions";

const town = Store.getState().town;

function processJob(jobId: string, quantity: number) {
  jobs[jobId].tick(town, quantity);
}

function tick() {
  gameActions.saveState();

  town.lastTick = Date.now();

  for (const jobId in town.jobAssignments) {
    processJob(jobId, town.jobAssignments[jobId]);
  }

  Store.update();

  setTimeout(tick, 60000);
}

setTimeout(tick);
