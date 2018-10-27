import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import Button from "./controls/Button";
import TownActions from "../actions/town-actions";
import resources from "../config/resources";
import GameFunctions from "../lib/game-functions";
import TownBuildings from "./town-buildings";

interface Props extends Partial<RouteComponentProps<{}>> {
  buildingId: string;
  buildingConfig: any;
  buildingData: any;
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
    let quantity = 0;

    if (buildingData) {
      quantity = buildingData.quantity;
    }

    const costElements = [];
    const cost = buildingConfig.cost(quantity);
    for (const resource in cost) {
      costElements.push(
        <div key={resource}>
          {cost[resource]} {resources[resource].name}
        </div>
      );
    }

    let visitButton = null;
    if (TownBuildings[this.props.buildingId]) {
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
              !GameFunctions.canAffordBuilding(this.props.buildingId, quantity)
            }
          >
            Upgrade
          </Button>
          <div style={{ fontSize: "12px", textAlign: "right" }}>
            {costElements}
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <div className="quantity">
                  <i className="fa fa-building" /> {quantity}
                </div>
              </td>
              <td>
                <div className="name">{buildingConfig.name}</div>
                <div className="description">{buildingConfig.description}</div>
                {visitButton}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(TownBuilding);
