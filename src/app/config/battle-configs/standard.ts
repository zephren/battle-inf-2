import GameActions from "../../actions/game-actions";
import { createItem } from "../../interfaces/ItemData";
import LogActions from "../../actions/log-actions";
import CBattle from "../../classes/Battle";
import CBattleTeam from "../../classes/BattleTeam";
import CEnemy from "../../classes/Enemy";
import MathExtra from "../../lib/math-extra";

export default function(
  battleConfig: any,
  onFinish: () => void
): (options: any) => CBattle {
  return (options: any): CBattle => {
    const enemies: any[] = [];

    const enemyCount = MathExtra.randomIntFromArray(battleConfig.enemyCount);

    for (let i = 0; i < enemyCount; i++) {
      const enemyTypeIndex = MathExtra.randomInt(
        0,
        battleConfig.enemyTypes.length - 1
      );
      const enemyType = battleConfig.enemyTypes[enemyTypeIndex];

      enemies.push(new CEnemy(enemyType, battleConfig));
    }

    //    enemies[0].data.name = "Monster 1A";

    const enemyTeam = new CBattleTeam(enemies);
    enemyTeam.name = "Enemy";

    const battle = new CBattle([options.heroTeam, enemyTeam]);

    battle.onFinish = (win: boolean) => {
      if (win) {
        const item = createItem();

        LogActions.addText(
          `:item:Found :r${item.rarity}:${item.name}:r${item.rarity}::item:`
        );

        GameActions.addItemToInventory(item);

        if (battleConfig.onWin) {
          battleConfig.onWin();
        }
      } else {
        if (battleConfig.onLose) {
          battleConfig.onLose();
        }
      }

      if (onFinish) {
        onFinish();
      }
    };

    return battle;
  };
}
