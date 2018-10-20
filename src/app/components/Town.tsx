import * as React from "react";
import TownBuilding from "./TownBuilding";
import buildings from "../config/buildings";
import jobs from "../config/jobs";
import Store from "../lib/store";

interface Props {}

export default class Town extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  renderBuildings() {
    const townData = Store.getState().town;
    const buildingElements = [];

    for (const i in buildings) {
      const buildingConfig = buildings[i];
      const buildingData = townData.buildings[i];

      buildingElements.push(
        <TownBuilding
          key={i}
          buildingId={i}
          buildingConfig={buildingConfig}
          buildingData={buildingData}
        />
      );
    }

    return buildingElements;
  }

  renderJobs() {
    const town = Store.getState().town;
    const jobElements = [];

    let totalWorking = 0;

    for (const jobId in town.jobAssignments) {
      const job = jobs[jobId];

      if (job) {
        const assignmentTotal = town.jobAssignments[jobId];

        totalWorking = assignmentTotal;

        jobElements.push(<div key={jobId}>{job.name}</div>);
      }
    }

    return (
      <div>
        <h1>Jobs</h1>
        Working Residents: {totalWorking} / {town.residents}
        {jobElements}
      </div>
    );
  }

  render() {
    return (
      <div className="town">
        <h1>Town</h1>

        {this.renderBuildings()}
        {this.renderJobs()}
      </div>
    );
  }
}
