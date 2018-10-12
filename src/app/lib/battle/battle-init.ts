import Store from "../store";
import CBattleTeam from "../../classes/BattleTeam";
import LogActions from "../log-actions";
import CBattle from "../../classes/Battle";

function battleInit(battleConfig: (options: any) => CBattle) {
  const state = Store.getState();
  const heroTeam = new CBattleTeam(state.heroes);

  heroTeam.name = "Hero";

  const battle = battleConfig({
    heroTeam
  });

  LogActions.addText(":t:Encounter:t:");
  for (const character of battle.teams[1].members) {
    LogActions.addCharacter(character);
  }

  battle.start();

  return battle;
}

export default battleInit;
