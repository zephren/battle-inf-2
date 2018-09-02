import * as React from "react";
import { RouteComponentProps } from "react-router";
import Store from "../lib/store";

import CHero from "../classes/Hero";
import CItem from "../classes/Item";

import Hero from "./Hero";
import Item from "./Item";
import itemActions from "../lib/item-actions";

interface MatchParams {
  index: number;
}

interface Props extends RouteComponentProps<MatchParams> {
  hero: CHero;
}

export default class HeroEquipment extends React.Component<Props> {
  state: {
    index?: number;
    hero?: CHero;
  } = {};

  constructor(props: any) {
    super(props);

    this.renderEquipment = this.renderEquipment.bind(this);

    const appState = Store.getState();
    const index = this.props.match.params.index;
    const hero = appState.heroes[index];

    this.state = {
      index,
      hero
    };
  }

  renderInventory() {
    const state = Store.getState();
    const itemElements: object[] = [];

    for (const item of state.inventory) {
      itemElements.push(
        <Item
          item={item}
          hero={this.state.hero}
          actions={[itemActions.equip]}
        />
      );
    }

    return itemElements;
  }

  renderEquipmentSlot(name: string, item: CItem): object {
    return (
      <div>
        <div>{name}</div>
        <Item
          item={item}
          hero={this.state.hero}
          actions={[itemActions.unequip]}
        />
      </div>
    );
  }

  renderEquipment() {
    const hero = this.state.hero;

    return (
      <div>
        <div>
          {this.renderEquipmentSlot("Head", hero.equipment.get("head"))}
        </div>
        <div>
          {this.renderEquipmentSlot("Body", hero.equipment.get("body"))}
        </div>
        <div>
          {this.renderEquipmentSlot("Legs", hero.equipment.get("legs"))}
        </div>
        <div>
          {this.renderEquipmentSlot("Feet", hero.equipment.get("feet"))}
        </div>
        <div>
          {this.renderEquipmentSlot("Hands", hero.equipment.get("hands"))}
        </div>
        <div>
          {this.renderEquipmentSlot("Left Hand", hero.equipment.get("hand", 1))}
        </div>
        <div>
          {this.renderEquipmentSlot(
            "Right Hand",
            hero.equipment.get("hand", 2)
          )}
        </div>
      </div>
    );
  }

  render() {
    const hero = this.state.hero;

    return (
      <div style={{ width: "100%" }}>
        <h1>Equipment</h1>

        <Hero hero={hero} index={this.state.index} />

        <div style={{ width: "49%", float: "left" }}>
          <h1>Equipment</h1>
          {this.renderEquipment()}
        </div>
        <div
          style={{
            width: "2%",
            height: "100px",
            float: "left"
          }}
        />
        <div style={{ width: "49%", float: "left" }}>
          <h1>Inventory</h1>
          {this.renderInventory()}
        </div>
      </div>
    );
  }
}
