import * as React from "react";
import Button from "./controls/Button";
import Store from "../lib/store";
import TownActions from "../lib/town-actions";

interface Props {
  buildingId: string;
  buildingConfig: any;
  buildingData: any;
}

export default class TownBuilding extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.upgrade = this.upgrade.bind(this);
  }

  upgrade() {
    TownActions.buildBuilding(this.props.buildingId);
  }

  render() {
    const buildingConfig = this.props.buildingConfig;
    const buildingData = this.props.buildingData;
    let quantity = 0;

    if (buildingData) {
      quantity = buildingData.quantity;
    }

    return (
      <div className="building">
        <div style={{ float: "right" }}>
          <Button onClick={this.upgrade}>Upgrade</Button>
        </div>
        <div className="quantity">
          <i className="fa fa-building" /> {quantity}
        </div>
        <div className="name">{buildingConfig.name}</div>
        <div className="description">{buildingConfig.description}</div>
      </div>
    );
  }
}
