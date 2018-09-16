import CBattleCharacter from "../../classes/BattleCharacter";
import LogActions from "../log-actions";
import statDisplay from "./stat-display";

export default function(
  attacker: CBattleCharacter,
  defender: CBattleCharacter
) {
  LogActions.addText(
    `:b:${attacker.data.name}:b: attacks :b:${defender.data.name}:b:`
  );

  let damage = attacker.data.statsTotal.atk - defender.data.statsTotal.def;

  if (damage < 1) {
    damage = 1;
  }

  const result = defender.applyDamage(damage);

  LogActions.addText(
    `:pad::b:${
      defender.data.name
    }:b: receives :n:${damage}:n: damage ${statDisplay(defender.data, "hp")}`
  );

  if (result) {
    result();
  }
}
