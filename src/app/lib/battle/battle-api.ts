import CBattleCharacter from "../../classes/BattleCharacter";
import CBattleTeam from "../../classes/BattleTeam";
import MathExtra from "../math-extra";
import LogActions from "../log-actions";
import attack from "./attack";

interface BattleApi {
  _setCurrentTeam: (team: CBattleTeam) => void;
  _setOpponentTeam: (team: CBattleTeam) => void;
  _setCurrentCharacter: (character: CBattleCharacter) => void;

  targetOpponent: (condition: object) => CBattleCharacter;
  targetOwn: (condition: object) => CBattleCharacter;

  attack: (condition: CBattleCharacter) => void;
}

interface BattleContext {
  teams: CBattleTeam[];
}

export default (battleContext: BattleContext) => {
  const teams = battleContext.teams;

  let currentTeam: CBattleTeam = null;
  let opponentTeam: CBattleTeam = null;
  let currentCharacter: CBattleCharacter = null;
  let currentCharacterActed: boolean = false;

  const battleApi: BattleApi = {
    _setCurrentTeam(team: CBattleTeam) {
      currentTeam = team;
    },

    _setOpponentTeam(team: CBattleTeam) {
      opponentTeam = team;
    },

    _setCurrentCharacter(character: CBattleCharacter) {
      currentCharacter = character;
      currentCharacterActed = false;
    },

    targetOpponent: (condition: object = {}) => {
      const aliveCount = opponentTeam.aliveMembers.length;
      const target =
        opponentTeam.aliveMembers[MathExtra.randomInt(0, aliveCount - 1)];
      return JSON.parse(JSON.stringify(target));
    },

    targetOwn: (condition: object = {}) => {
      const aliveCount = currentTeam.aliveMembers.length;
      const target =
        currentTeam.aliveMembers[MathExtra.randomInt(0, aliveCount - 1)];
      return JSON.parse(JSON.stringify(target));
    },

    attack: (psudoTarget: CBattleCharacter) => {
      if (!currentCharacterActed) {
        const target = opponentTeam.getMemberById(psudoTarget.data.id);

        currentCharacterActed = true;

        attack(currentCharacter, target);
      } else {
        LogActions.addText(
          `:b:${currentCharacter.data.name}:b: has already acted...`
        );
      }
    }
  };

  return battleApi;
};
``;
