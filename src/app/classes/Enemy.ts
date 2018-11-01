import CBattleCharacter from "./BattleCharacter";
import MathExtra from "../lib/math-extra";
import ICharacterData from "../interfaces/CharacterData";
import ArrayExtra from "../lib/array-extra";
import IEnemyType from "../interfaces/EnemyType";
import IEnemyClass from "../interfaces/EnemyClass";

export default class CEnemy extends CBattleCharacter {
  enemyClass: IEnemyClass = null;

  constructor(enemyConfig: IEnemyType, battleConfig: any) {
    super();

    const data: ICharacterData = this.data;
    const enemyClass: IEnemyClass = ArrayExtra.randomItem(enemyConfig.classes);

    this.enemyClass = enemyClass;

    data.name = `${enemyConfig.name}  - ${enemyClass.name}`;
    data.level = MathExtra.randomIntFromArray(battleConfig.enemyLevelRange);

    data.statsBase.hp = 50;
    data.statsBase.atk = 5;
    data.statsBase.def = 5;
    data.statsBase.dex = 5;

    for (const stat in data.statsGrowth) {
      data.statsGrowth[stat] += MathExtra.randomFloatFromArray(
        enemyConfig.statRatios[stat]
      );

      if (data.statsGrowth[stat] < 0) {
        data.statsGrowth[stat] = 0;
      }

      if (data.statsGrowth[stat] > 1) {
        data.statsGrowth[stat] = 1;
      }
    }

    this.updateBaseStats(battleConfig.enemyMod);

    this.battleFunction = ArrayExtra.randomItem(enemyClass.behaviors);
  }
}
