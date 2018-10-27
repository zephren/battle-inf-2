import * as React from "react";
import CCharacter from "../classes/Character";
import IItemData from "../interfaces/ItemData";
import Stats from "./Stats";

import Button from "./controls/Button";
import Hero from "./Hero";

interface IItemAction {
  name: string;
  action(hero: CCharacter, item: IItemData): void;
}

interface Props {
  item: IItemData;
  hero?: CCharacter;
  actions?: IItemAction[];
}

export default class Item extends React.Component<Props> {
  constructor(props: any) {
    super(props);

    this.renderActions = this.renderActions.bind(this);
    this.renderRarity = this.renderRarity.bind(this);
  }

  renderActions(): object[] {
    const actions = this.props.actions || [];
    const actionElements: object[] = [];
    const item = this.props.item;
    const hero = this.props.hero;

    for (const i in actions) {
      const action = actions[i];

      actionElements.push(
        <Button key={i} onClick={() => action.action(hero, item)}>
          {action.name}
        </Button>
      );
    }

    return actionElements;
  }

  renderRarity() {
    const item = this.props.item;
    const rarityElements: object[] = [];

    for (let i = 0; i < item.rarity; i++) {
      rarityElements.push(<i key={i} className="fa fa-star" />);
    }

    return rarityElements;
  }

  render() {
    const item = this.props.item;

    if (!item) {
      return (
        <div className="item">
          <div className="item-inner">Empty</div>
        </div>
      );
    }

    const rarityClassName = "item-rarity r" + item.rarity;

    let slotCount = null;
    if (item.slots === 2) {
      slotCount = <span>(2h)</span>;
    }

    return (
      <div className="item">
        <div className="item-inner">
          <div className={rarityClassName}>
            <span className="item-name">{item.name}</span>
            <span className="level">Lv. {item.level}</span>
            {slotCount}
            <span className="rarity">{this.renderRarity()}</span>
          </div>
          <div className="actions">{this.renderActions()}</div>
          <Stats stats={item.stats} />
          <div className="clear" />
        </div>
      </div>
    );
  }
}
