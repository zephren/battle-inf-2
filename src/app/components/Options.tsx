import * as React from "react";
import Store, { setupState } from "../store";
import ConfirmButton from "./controls/ConfirmButton";

export default class Options extends React.Component {
  save() {
    setupState(true);
    Store.update();
  }

  render() {
    return (
      <div>
        <h1>Options</h1>

        <ConfirmButton onConfirm={this.save}>Rest</ConfirmButton>
      </div>
    );
  }
}
