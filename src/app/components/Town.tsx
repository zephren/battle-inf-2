import * as React from "react";

export default class Town extends React.Component {
  renderBuildings() {}

  render() {
    return (
      <div>
        <h1>Town</h1>

        {this.renderBuildings()}
      </div>
    );
  }
}
