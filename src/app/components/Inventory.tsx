import * as React from "react";
import Store from "../lib/store";
import ItemActions from "../lib/item-actions";

import Item from "./Item";
import itemActions from "../lib/item-actions";

export default class Inventory extends React.Component {
  render() {
    const state = Store.getState();
    const itemElements: object[] = [];

    for (const item of state.inventory) {
      itemElements.push(<Item item={item} actions={[itemActions.sell]} />);
    }

    return (
      <div>
        <h1>Inventory</h1>
        {itemElements}
      </div>
    );
  }
}
