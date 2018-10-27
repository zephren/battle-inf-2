import CCharacter from "./Character";
import CBattleCharacter from "./BattleCharacter";
import IStats, { createStats } from "../interfaces/Stats";

export default class CBattleGains {
  members: {
    [key: string]: CBattleCharacter;
  };
  battleGains: {
    [key: string]: IStats;
  } = {};

  constructor(members: { [key: string]: CBattleCharacter }) {
    for (const memberId in members) {
      this.battleGains[memberId] = createStats();
    }

    this.members = members;
  }

  addGainWithMod(stat: string, tempCharacter: CCharacter, mod: number) {
    const id = tempCharacter.data.id;
    const character = this.members[id];

    let amount = character.data.statsGrowth[stat] * mod;

    this.battleGains[id][stat] += amount;
  }

  addGainWithCharacter(
    stat: string,
    tempCharacter: CCharacter,
    otherStat: string,
    otherCharacter: CCharacter
  ) {
    const id = tempCharacter.data.id;
    const character = this.members[id];

    const statRatio =
      Math.sqrt(otherCharacter.data.statsBase[otherStat]) /
      character.data.statsBase[stat];
    let amount = character.data.statsGrowth[stat] * statRatio;

    this.battleGains[id][stat] += amount;
  }
}
