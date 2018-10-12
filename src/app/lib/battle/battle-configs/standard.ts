import Store from "../../store";
import GameActions from "../../game-actions";
import { createItem } from "../../../interfaces/ItemData";
import LogActions from "../../log-actions";
import CBattle from "../../../classes/Battle";
import CBattleTeam from "../../../classes/BattleTeam";
import CEnemy from "../../../classes/Enemy";
import justAttack from "../../enemies/behaviors/just-attack";

export default function(onFinish: () => void): (options: any) => CBattle {
  return (options: any): CBattle => {
    const enemies = [new CEnemy(justAttack)];

    enemies[0].data.name = "Monster 1A";

    const enemyTeam = new CBattleTeam(enemies);
    enemyTeam.name = "Enemy";

    const battle = new CBattle([options.heroTeam, enemyTeam]);

    battle.onFinish = () => {
      if (onFinish) {
        onFinish();
      }

      const item = createItem();

      LogActions.addText(
        `:item:Found :r${item.rarity}:${item.name}:r${item.rarity}::item:`
      );

      GameActions.addItemToInventory(item);
    };

    return battle;
  };
}
