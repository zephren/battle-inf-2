import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import Button from "./controls/Button";
import TownActions from "../actions/town-actions";
import resources from "../config/resources";
import GameFunctions from "../lib/game-functions";
import TownBuildings from "./town-buildings";
import IBuildingData from "../interfaces/BuildingData";
import Flipper from "./controls/Flipper";

interface Props extends Partial<RouteComponentProps<{}>> {
  buildingId: string;
  buildingConfig: any;
  buildingData: IBuildingData;
}

class TownBuilding extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.upgrade = this.upgrade.bind(this);
    this.expand = this.expand.bind(this);
    this.visitBuilding = this.visitBuilding.bind(this);
  }

  upgrade() {
    TownActions.upgradeBuilding(this.props.buildingId);
  }

  expand() {
    TownActions.expandBuilding(this.props.buildingId);
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
          <b>{upgradeCost[resource]}</b> {resources[resource].name}
        </div>
      );
    }

    const expandCostElements = [];
    const expandCost = buildingConfig.expandCost(buildingData);
    for (const resource in expandCost) {
      expandCostElements.push(
        <div key={resource}>
          <b>{expandCost[resource]}</b> {resources[resource].name}
        </div>
      );
    }

    let visitButton = null;
    if (TownBuildings[buildingId]) {
      visitButton = <Button onClick={this.visitBuilding}>Visit</Button>;
    }

    const buildingFront = (
      <div className="building">
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    const buildingBack = (
      <div className="building">
        <div style={{ float: "left", marginRight: "10px" }}>
          <div style={{ fontSize: "12px" }}>{upgradeCostElements}</div>
        </div>
        <Button
          style={{ float: "left", marginRight: "50px" }}
          onClick={this.upgrade}
          disabled={
            !GameFunctions.canAffordBuildingUpgrade(buildingId, buildingData)
          }
        >
          Upgrade
        </Button>

        <div style={{ float: "left", marginRight: "10px" }}>
          <div style={{ fontSize: "12px" }}>{expandCostElements}</div>
        </div>
        <Button
          style={{ float: "left" }}
          onClick={this.expand}
          disabled={
            !GameFunctions.canAffordBuildingExpand(buildingId, buildingData)
          }
        >
          Expand
        </Button>

        <div style={{ float: "right" }}>{visitButton}</div>

        <div style={{ clear: "both" }} />
      </div>
    );

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100px",
          marginBottom: "5px"
        }}
      >
        <Flipper direction="vertical">
          <Flipper.Front>{buildingFront}</Flipper.Front>
          <Flipper.Back>{buildingBack}</Flipper.Back>
        </Flipper>
      </div>
    );
  }
}

export default withRouter(TownBuilding);
