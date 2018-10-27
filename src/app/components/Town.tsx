import * as React from "react";
import { RouteComponentProps } from "react-router";
import TownBuilding from "./TownBuilding";
import buildings from "../config/buildings";
import jobs from "../config/jobs";
import resources from "../config/resources";
import Store from "../store";
import TownJob from "./TownJob";
import GameFunctions from "../lib/game-functions";
import TownBuildings from "./town-buildings";

interface MatchParams {
  buildingId: string;
}

interface Props extends RouteComponentProps<MatchParams> {}

export default class Town extends React.Component<Props> {
  updateTimer: any;

  constructor(props: any) {
    super(props);

    this.updateTimer = setInterval(this.setState.bind(this, {}), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateTimer);
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

    for (const jobId in jobs) {
      const job = jobs[jobId];

      if (job) {
        const assignmentTotal = town.jobAssignments[jobId];

        totalWorking += assignmentTotal || 0;

        jobElements.push(
          <TownJob
            key={jobId}
            jobId={jobId}
            job={job}
            totalAssigned={assignmentTotal}
          />
        );
      }
    }

    return (
      <div>
        <h1>Jobs</h1>
        Working Residents: {totalWorking} /{" "}
        {GameFunctions.getTownResidentSpace()}
        {jobElements}
      </div>
    );
  }

  renderResources() {
    const town = Store.getState().town;
    const resourceElements = [];

    for (const resourceId in town.resources) {
      resourceElements.push(
        <div key={resourceId}>
          <div style={{ float: "left" }}>{resources[resourceId].name}</div>
          <div style={{ float: "right" }}>
            <b>{town.resources[resourceId]}</b>
          </div>
          <div style={{ clear: "both" }} />
        </div>
      );
    }

    return (
      <div>
        <h2>Resources</h2>
        {resourceElements}
      </div>
    );
  }

  render() {
    if (this.props.match && this.props.match.params.buildingId) {
      const Building = TownBuildings[this.props.match.params.buildingId];
      return <Building />;
    }

    const town = Store.getState().town;

    return (
      <div className="town">
        <div style={{ float: "right" }}>
          Next Tick
          <div style={{ fontSize: "30px", textAlign: "right" }}>
            {Math.floor((town.lastTick + 60000 - Date.now()) / 1000)}
          </div>
        </div>

        <h1>Town</h1>

        <div style={{ clear: "both" }} />

        <div style={{ float: "right", width: "28%", paddingLeft: "2%" }}>
          {this.renderResources()}
        </div>
        <div style={{ float: "right", width: "70%" }}>
          {this.renderBuildings()}
          {this.renderJobs()}
        </div>
      </div>
    );
  }
}
