import * as React from "react";
import Button from "./controls/Button";
import Store from "../lib/store";
import LogActions from "../lib/log-actions";

import { withRouter, RouteComponentProps } from "react-router";
import CBattle from "../classes/Battle";
import CBattleTeam from "../classes/BattleTeam";
import CEnemy from "../classes/Enemy";
import justAttack from "../lib/enemies/behaviors/just-attack";

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
    name: "Inventory",
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
    onClick: function() {}
  }
];

class Header extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.startBattle = this.startBattle.bind(this);
  }

  startBattle() {
    const state = Store.getState();
    const heroes = state.heroes;
    const enemies = [new CEnemy(justAttack)];

    enemies[0].data.name = "Monster 1";
    // enemies[1].data.name = "Monster 2";

    LogActions.addText(":t:Encounter:t:");
    LogActions.addCharacter(enemies[0]);
    // LogActions.addCharacter(enemies[1]);

    const teamA = new CBattleTeam(heroes);
    teamA.name = "Hero";
    const teamB = new CBattleTeam(enemies);
    teamB.name = "Enemy";

    const battle = new CBattle([teamA, teamB]);

    battle.start();
    battle.onFinish = () => {
      state.battle = null;
      Store.update();
    };

    state.battle = battle;

    Store.update();
  }

  stopBattle() {
    const state = Store.getState();
    const battle = state.battle;

    battle.stop();
  }

  render() {
    const state = Store.getState();
    const headerElements = [];

    for (const i in options) {
      const option = options[i];
      const selected =
        this.props.location.pathname.toString().split("/")[1] === option.id;

      headerElements.push(
        <Button
          key={i}
          selected={selected}
          onClick={option.onClick.bind(this, this.props)}
        >
          {option.name}
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
        </div>
        {headerElements}
      </div>
    );
  }
}

export default withRouter(Header);
