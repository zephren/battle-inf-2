import CCharacter from "./Character";
import CBattleCharacter from "./BattleCharacter";

export default class Enemy extends CBattleCharacter {
  constructor(battleFunction: (context: any) => void) {
    super();

    this.battleFunction = battleFunction;
  }
}
