import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import Button from "./controls/Button";
import TownActions from "../actions/town-actions";
import resources from "../config/resources";
import GameFunctions from "../lib/game-functions";
import TownBuildings from "./town-buildings";
import IBuildingData from "../interfaces/BuildingData";

interface Props extends Partial<RouteComponentProps<{}>> {
  buildingId: string;
  buildingConfig: any;
  buildingData: IBuildingData;
}

class TownBuilding extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.upgrade = this.upgrade.bind(this);
    this.visitBuilding = this.visitBuilding.bind(this);
  }

  upgrade() {
    TownActions.upgradeBuilding(this.props.buildingId);
  }

  visitBuilding() {
    this.props.history.push(`/town/${this.props.buildingId}`);
  }

  render() {
    const buildingConfig = this.props.buildingConfig;
    const buildingData = this.props.buildingData;
    const buildingId = this.props.buildingId;

    if (!buildingData) {
      return null;
    }

    const size = buildingData.size;
    const quality = buildingData.quality;

    const upgradeCostElements = [];
    const upgradeCost = buildingConfig.upgradeCost(buildingData);
    for (const resource in upgradeCost) {
      upgradeCostElements.push(
        <div key={resource}>
          {upgradeCost[resource]} {resources[resource].name}
        </div>
      );
    }

    const expandCostElements = [];
    const expandCost = buildingConfig.expandCost(buildingData);
    for (const resource in expandCost) {
      expandCostElements.push(
        <div key={resource}>
          {expandCost[resource]} {resources[resource].name}
        </div>
      );
    }

    let visitButton = null;
    if (TownBuildings[buildingId]) {
      visitButton = (
        <div style={{ marginTop: "10px" }}>
          <Button onClick={this.visitBuilding}>Visit</Button>
        </div>
      );
    }

    return (
      <div className="building">
        <div style={{ float: "right" }}>
          <Button
            onClick={this.upgrade}
            disabled={
              !GameFunctions.canAffordBuildingUpgrade(buildingId, buildingData)
            }
          >
            Upgrade
          </Button>
          <div style={{ fontSize: "12px", textAlign: "right" }}>
            {upgradeCostElements}
          </div>
          <Button
            onClick={this.upgrade}
            disabled={
              !GameFunctions.canAffordBuildingExpand(buildingId, buildingData)
            }
          >
            Expand
          </Button>
          <div style={{ fontSize: "12px", textAlign: "right" }}>
            {expandCostElements}
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <table className="building-data">
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <i className="fa fa-building" />
                      </td>
                      <td>{size}</td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <i className="fa fa-star" />
                      </td>
                      <td>{quality}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td>
                <div className="name">{buildingConfig.name}</div>
                <div className="description">{buildingConfig.description}</div>
                {visitButton}
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ clear: "both" }} />
      </div>
    );
  }
}

export default withRouter(TownBuilding);
