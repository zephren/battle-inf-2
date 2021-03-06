import * as React from "react";
import Button from "./controls/Button";
import Store from "../store";
import TownActions from "../actions/town-actions";
import GameFunctions from "../lib/game-functions";

interface Props {
  jobId: string;
  job: any;
  totalAssigned: number;
}

export default class TownJob extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.assign = this.assign.bind(this);
    this.unassign = this.unassign.bind(this);
  }

  assign() {
    TownActions.assignToJob(this.props.jobId);
  }

  unassign() {
    TownActions.unassignFromJob(this.props.jobId);
  }

  canAssign(job: any, town: any) {
    if (
      !job.canAssign() ||
      GameFunctions.getTownJobAssignmentCount() >=
        GameFunctions.getTownResidentSpace()
    ) {
      return false;
    }

    return true;
  }

  canUnassign(job: any, town: any) {
    if (
      !town.jobAssignments[this.props.jobId] ||
      town.jobAssignments[this.props.jobId] <= 0
    ) {
      return false;
    }

    return true;
  }

  render() {
    const job = this.props.job;
    const town = Store.getState().town;

    if (!job.isAvailable()) {
      return null;
    }

    let canAssign = this.canAssign(job, town);
    let canUnassign = this.canUnassign(job, town);

    return (
      <div className="job">
        <div style={{ float: "right" }}>
          <Button onClick={this.assign} disabled={!canAssign}>
            <i className="fa fa-plus" />
          </Button>
          <Button onClick={this.unassign} disabled={!canUnassign}>
            <i className="fa fa-minus" />
          </Button>
        </div>

        <table className="job-data">
          <tbody>
            <tr>
              <td style={{ textAlign: "center" }}>
                <i className="fa fa-user" />
              </td>
              <td>{this.props.totalAssigned || 0}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ float: "left" }}>
          <div className="name">{job.name}</div>
          <div className="description">{job.description}</div>
        </div>

        <div style={{ clear: "both" }} />
      </div>
    );
  }
}
