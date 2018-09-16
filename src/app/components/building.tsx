import * as React from "react";
import Button from "./controls/Button";

interface Props {
  building: any;
}

export default class Item extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const building = this.props.building;

    return (
      <div className="building">
        <div className="name">{building.name}</div>
      </div>
    );
  }
}
