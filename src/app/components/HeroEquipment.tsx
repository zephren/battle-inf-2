import * as React from "react";
import { RouteComponentProps } from "react-router";
import Button from "./controls/Button";
import Store from "../lib/store";

import CHero from "../classes/Hero";
import IItemData from "../interfaces/ItemData";

import Hero from "./Hero";
import Item from "./Item";
import itemActions from "../lib/item-actions";

interface MatchParams {
  index: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  hero: CHero;
}

export default class HeroEquipment extends React.Component<Props, {}> {
  state: {
    index?: number;
    hero?: CHero;
  } = {};

  constructor(props: any) {
    super(props);

    this.renderEquipment = this.renderEquipment.bind(this);
    this.renderInventory = this.renderInventory.bind(this);
    this.nextHero = this.nextHero.bind(this);

    const index = parseInt(this.props.match.params.index);

    this.state = {
      index
    };
  }

  componentWillReceiveProps(newProps: any) {
    const index = parseInt(newProps.match.params.index);

    this.setState({
      index
    });
  }

  renderInventory() {
    const state = Store.getState();
    const itemElements: object[] = [];
    const index = this.state.index;
    const hero = Store.getState().heroes[index];

    for (const i in state.inventory) {
      const item = state.inventory[i];

      itemElements.push(
        <Item key={i} item={item} hero={hero} actions={[itemActions.equip]} />
      );
    }

    return itemElements;
  }

  renderEquipmentSlot(name: string, item: IItemData): object {
    const index = this.state.index;
    const hero = Store.getState().heroes[index];

    return (
      <div>
        <div>{name}</div>
        <Item item={item} hero={hero} actions={[itemActions.unequip]} />
      </div>
    );
  }

  renderEquipment() {
    const index = this.state.index;
    const hero = Store.getState().heroes[index];
    const equipment = hero.getEquipment();

    return (
      <div>
        <div>{this.renderEquipmentSlot("Head", equipment.get("head"))}</div>
        <div>{this.renderEquipmentSlot("Body", equipment.get("body"))}</div>
        <div>{this.renderEquipmentSlot("Legs", equipment.get("legs"))}</div>
        <div>{this.renderEquipmentSlot("Feet", equipment.get("feet"))}</div>
        <div>{this.renderEquipmentSlot("Hands", equipment.get("hands"))}</div>
        <div>
          {this.renderEquipmentSlot("Left Hand", equipment.get("hand", 1))}
        </div>
        <div>
          {this.renderEquipmentSlot("Right Hand", equipment.get("hand", 2))}
        </div>
      </div>
    );
  }

  nextHero() {
    const state = Store.getState();
    let nextIndex = this.state.index + 1;

    if (nextIndex >= state.heroes.length) {
      nextIndex = 0;
    }

    this.props.history.push(`/heroes/${nextIndex}/equipment`);
  }

  render() {
    const index = this.state.index;
    const hero = Store.getState().heroes[index];

    return (
      <div style={{ width: "100%" }}>
        <h1>
          <div style={{ float: "right" }}>
            <Button onClick={this.nextHero}>Next</Button>
          </div>
          Equipment
        </h1>

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
