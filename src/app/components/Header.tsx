import * as React from "react";
import Button from "./controls/Button";
import ConfirmButton from "./controls/ConfirmButton";
import Store, { setupState } from "../store";
import battleInit from "../lib/battle/battle-init";
import gameFunctions from "../lib/game-functions";
import { withRouter, RouteComponentProps } from "react-router";
import Values from "../config/values";

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

      return `Inventory (${inventory.length} / ${Values.inventorySize()})`;
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
    name: "Map",
    id: "map",
    onClick: function(props: Props) {
      props.history.push("/map");
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
    name: "Save",
    onClick: function() {
      Store.saveState();
      alert("Saved!");
    }
  }
];

class Header extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.startBattle = this.startBattle.bind(this);
    this.stopBattle = this.stopBattle.bind(this);
    this.toggleBattleInfinite = this.toggleBattleInfinite.bind(this);
    this.renderLocationActions = this.renderLocationActions.bind(this);
  }

  startBattle() {
    const state = Store.getState();

    const location = gameFunctions.getMapLocationByName(state.currentLocation);
    const battleType = location.battleConfig.type;

    state.battle = battleInit(
      battleType(location.battleConfig, () => {
        // Need to clear out the battle from the state once it is done
        state.battle = null;
        Store.update();

        // Start another battle if the option is selected
        if (state.battleInfinite) {
          this.startBattle();
        }
      })
    );

    Store.update();
  }

  stopBattle() {
    const state = Store.getState();
    const battle = state.battle;
    state.battleInfinite = false;

    battle.stop(false);

    Store.update();
  }

  toggleBattleInfinite() {
    const state = Store.getState();
    state.battleInfinite = !state.battleInfinite;
    Store.update();
  }

  renderLocationActions() {
    const state = Store.getState();
    let locationActions: any = null;

    const areaName = (
      <span
        style={{
          float: "left",
          lineHeight: "30px",
          fontSize: "20px"
        }}
      >
        {state.currentLocation}
      </span>
    );

    const location = gameFunctions.getMapLocationByName(state.currentLocation);

    if (!location.battleConfig) {
      locationActions = areaName;
    } else {
      let stopBattle = null;
      if (state.battle) {
        stopBattle = (
          <Button onClick={this.stopBattle}>
            <i className="fa fa-times" />
          </Button>
        );
      }

      locationActions = (
        <div>
          {areaName}
          <div style={{ marginLeft: "10px", float: "left" }}>
            <Button onClick={this.startBattle} disabled={!!state.battle}>
              {state.battle ? "Battling" : "Start Battle"}
            </Button>
            {stopBattle}
            <Button
              onClick={this.toggleBattleInfinite}
              selected={state.battleInfinite}
            >
              <i className="fa fa-infinity" />
            </Button>
          </div>
        </div>
      );
    }

    return locationActions;
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

    return (
      <div>
        <div style={{ float: "right" }}>{this.renderLocationActions()}</div>
        {headerElements}
      </div>
    );
  }
}

export default withRouter(Header);
