import * as React from "react";
import Store from "../lib/store";
import ItemActions from "../lib/item-actions";
import { RouteComponentProps } from "react-router";

import Item from "./Item";

interface Props extends Partial<RouteComponentProps<{}>> {}

export default class Inventory extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.goNewItemAction = this.goNewItemAction.bind(this);
  }

  goNewItemAction() {
    this.props.history.push(`/inventory/newItemAction`);
  }

  render() {
    const state = Store.getState();
    const itemElements: object[] = [];

    for (const i in state.inventory) {
      const item = state.inventory[i];

      itemElements.push(
        <Item key={i} item={item} actions={[ItemActions.sell]} />
      );
    }

    return (
      <div>
        <h1>Inventory</h1>
        <button onClick={this.goNewItemAction}>New Item Action</button>
        {itemElements}
      </div>
    );
  }
}
