import CBattleCharacter from "./BattleCharacter";

export default class CEnemy extends CBattleCharacter {
  constructor(
    enemyConfig: any,
    battleFunction: (context: any) => void,
    battleConfig: any
  ) {
    super();

    const data: any = this.data;

    data.name = enemyConfig.name;

    data.statsBase.hp = 50;
    data.statsBase.atk = 10;
    data.statsBase.def = 10;
    data.statsBase.dex = 10;

    for (const stat in data.statsBase) {
      data.statsBase[stat] *= battleConfig.enemyModifier;
    }

    for (const stat in enemyConfig.statModifiers) {
      data.statsBase[stat] = Math.round(
        data.statsBase[stat] * enemyConfig.statModifiers[stat]
      );
    }

    this.battleFunction = battleFunction;
  }
}
