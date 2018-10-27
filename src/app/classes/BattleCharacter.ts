import ICharacterData from "../interfaces/CharacterData";
import CCharacter from "../classes/Character";
import Istats, { createStats } from "../interfaces/Stats";
import LogActions from "../actions/log-actions";
import store from "../store";

export default class CBattleCharacter extends CCharacter {
  teamIndex: number;
  battleFunction: (context: any) => void;

  constructor(data: ICharacterData = null) {
    // Clone the data
    super(JSON.parse(JSON.stringify(data)));
  }

  clone() {
    const battleCharacter: CBattleCharacter = <CBattleCharacter>super.clone();

    battleCharacter.teamIndex = this.teamIndex;
    battleCharacter.battleFunction = this.battleFunction;

    return battleCharacter;
  }

  initForBattle() {
    this.updateTotalStats();
    this.setActualStats();
  }

  isAlive() {
    return this.data.statsActual.hp > 0;
  }

  applyDamage(amount: number) {
    this.data.statsActual.hp -= amount;

    if (this.data.statsActual.hp <= 0) {
      const state = store.getState();
      const team = state.battle.getTeam(this.teamIndex);

      this.data.statsActual.hp = 0;

      team.memberDied(this);

      return () => {
        LogActions.addText(
          `:def::b:${this.data.name}:b: has been knocked out:def:`
        );
      };
    }

    return null;
  }
}
