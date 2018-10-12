import * as React from "react";
import Building from "./Building";
import buildings from "../config/buildings";
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
        <Building
          key={i}
          buildingId={i}
          buildingConfig={buildingConfig}
          buildingData={buildingData}
        />
      );
    }

    return buildingElements;
  }

  render() {
    return (
      <div className="town">
        <h1>Town</h1>

        {this.renderBuildings()}
      </div>
    );
  }
}
