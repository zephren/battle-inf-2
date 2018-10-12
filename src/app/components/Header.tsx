import * as React from "react";
import Button from "./controls/Button";
import Store, { setupState } from "../lib/store";
import battleInit from "../lib/battle/battle-init";
import standardBattle from "../lib/battle/battle-configs/standard";
import { withRouter, RouteComponentProps } from "react-router";

interface Props extends Partial<RouteComponentProps<{}>> {}

const options = [
  {
    name: "Heroes",
    id: "heroes",
    onClick: function(props: Props) {
      props.history.push("/heroes");
    }
  },
  {
    name: () => {
      const state = Store.getState();
      const inventory = state.inventory;
      const properties = state.properties;
      return `Inventory (${inventory.length} / ${properties.inventorySize})`;
    },
    id: "inventory",
    onClick: function(props: Props) {
      props.history.push("/inventory");
    }
  },
  {
    name: "Town",
    id: "town",
    onClick: function(props: Props) {
      props.history.push("/town");
    }
  },
  {
    name: "Options",
    id: "options",
    onClick: function(props: Props) {
      props.history.push("/options");
    }
  },
  {
    name: "Reset",
    onClick: function() {
      setupState(true);
      Store.update();
    }
  }
];

class Header extends React.Component<Props, {}> {
  state: {
    battleInfinite?: boolean;
  } = {};

  constructor(props: any) {
    super(props);

    this.startBattle = this.startBattle.bind(this);
    this.toggleBattleInfinite = this.toggleBattleInfinite.bind(this);

    this.state.battleInfinite = false;
  }

  startBattle() {
    const state = Store.getState();

    state.battle = battleInit(
      standardBattle(() => {
        // Need to clear out the battle from the state once it is done
        state.battle = null;
        Store.update();
      })
    );

    Store.update();
  }

  stopBattle() {
    const state = Store.getState();
    const battle = state.battle;

    battle.stop();
  }

  toggleBattleInfinite() {
    this.setState({
      battleInfinite: !this.state.battleInfinite
    });
  }

  render() {
    const state = Store.getState();
    const headerElements = [];

    for (const i in options) {
      const option = options[i];
      const selected =
        this.props.location.pathname.toString().split("/")[1] === option.id;

      const name =
        typeof option.name === "function" ? option.name() : option.name;

      headerElements.push(
        <Button
          key={i}
          selected={selected}
          onClick={option.onClick.bind(this, this.props)}
        >
          {name}
        </Button>
      );
    }

    let stopBattle = null;
    if (state.battle) {
      stopBattle = (
        <Button onClick={this.stopBattle}>
          <i className="fa fa-times" />
        </Button>
      );
    }

    return (
      <div>
        <div style={{ float: "right" }}>
          <Button onClick={this.startBattle} disabled={!!state.battle}>
            Start Battle
          </Button>
          {stopBattle}
          <Button
            onClick={this.toggleBattleInfinite}
            selected={this.state.battleInfinite}
          >
            <i className="fa fa-infinity" />
          </Button>
        </div>
        {headerElements}
      </div>
    );
  }
}

export default withRouter(Header);
