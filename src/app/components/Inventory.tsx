import * as React from "react";

import Item from "./Item";

export default class Inventory extends React.Component {
  render() {
    return (
      <div>
        <h1>Inventory</h1>
        <Item item={{}} />
        <Item item={{}} />
        <Item item={{}} />
      </div>
    );
  }
}
