import CBattleCharacter from "../../classes/BattleCharacter";
import CBattleTeam from "../../classes/BattleTeam";
import CBattleGains from "../../classes/BattleGains";
import MathExtra from "../math-extra";
import LogActions from "../../actions/log-actions";
import attack from "./attack";

export interface IBattleApi {
  _setCurrentTeam: (team: CBattleTeam) => void;
  _setOpponentTeam: (team: CBattleTeam) => void;
  _setCurrentCharacter: (character: CBattleCharacter) => void;

  targetOpponent: (condition: object) => CBattleCharacter;
  targetOwn: (condition: object) => CBattleCharacter;

  attack: (condition: CBattleCharacter) => void;
}

export interface IBattleContext {
  teams: CBattleTeam[];
  battleGains: CBattleGains;
}

export default (battleContext: IBattleContext) => {
  const teams = battleContext.teams;
  const battleGains = battleContext.battleGains;

  let currentTeam: CBattleTeam = null;
  let opponentTeam: CBattleTeam = null;
  let currentCharacter: CBattleCharacter = null;
  let currentCharacterActed: boolean = false;

  const battleApi: IBattleApi = {
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

        const damage = attack(currentCharacter, target);

        battleGains.addGainWithMod("hp", psudoTarget, Math.sqrt(damage));
        battleGains.addGainWithCharacter(
          "def",
          psudoTarget,
          "atk",
          currentCharacter
        );

        battleGains.addGainWithCharacter(
          "atk",
          currentCharacter,
          "def",
          target
        );
        battleGains.addGainWithCharacter(
          "dex",
          currentCharacter,
          "dex",
          target
        );
      } else {
        LogActions.addText(
          `:b:${currentCharacter.data.name}:b: has already acted...`
        );
      }
    }
  };

  return battleApi;
};
