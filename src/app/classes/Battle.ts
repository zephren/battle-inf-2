import CCharacter from "./Character";
import CBattleTeam from "./BattleTeam";
import CBattleCharacter from "./BattleCharacter";
import BattleApi, { IBattleContext } from "../lib/battle/battle-api";
import LogActions from "../actions/log-actions";
import BattleGains from "./BattleGains";

interface MemberOrder {
  id: string;
  value: number;
}

export default class CBattle {
  teams: CBattleTeam[];
  battleTimer: any;
  members: {
    [key: string]: CBattleCharacter;
  } = {};
  originalMembers: {
    [key: string]: CCharacter;
  } = {};
  memberOrder: MemberOrder[] = [];
  battleContext: IBattleContext;
  onFinish: (win: boolean) => void;

  constructor(teams: CBattleTeam[]) {
    for (const teamIndex in teams) {
      const team = teams[teamIndex];

      for (const memberId in team.originalMembersById) {
        this.originalMembers[memberId] = team.originalMembersById[memberId];
      }

      for (const member of team.members) {
        member.teamIndex = parseInt(teamIndex);

        member.initForBattle();

        this.members[member.data.id] = member;
        this.memberOrder.push({
          id: member.data.id,
          value: member.data.statsTotal.dex
        });

        this.initialize(member);
      }
    }

    this.teams = teams;
  }

  initialize(member: CBattleCharacter) {
    if (member.battleFunction) {
      return;
    }

    let battleFunction = (context: any): void => {};

    if (member.data.battlActionCode) {
      eval(`
        battleFunction = (context) => {
          const member = undefined;
          const hero = context.hero;
          const battle = context.battleApi;

          context = undefined;

          ${member.data.battlActionCode}
        }
      `);
    }

    member.battleFunction = battleFunction;
  }

  sortMemberOrder() {
    this.memberOrder = this.memberOrder.sort(
      (a: MemberOrder, b: MemberOrder) => {
        if (a.value > b.value) {
          return -1;
        }

        if (a.value < b.value) {
          return 1;
        }

        return 0;
      }
    );
  }

  getNextMember(): CBattleCharacter {
    this.sortMemberOrder();

    const memberId = this.memberOrder[0].id;
    const member = this.members[memberId];

    this.memberOrder[0].value = 0;

    for (const memberOrder of this.memberOrder) {
      const member = this.members[memberOrder.id];
      memberOrder.value += member.data.statsTotal.dex;
    }

    return member;
  }

  getTeam(index: number): CBattleTeam {
    return this.teams[index];
  }

  checkState(): () => void {
    for (const index in this.teams) {
      const team = this.teams[index];

      if (!team.isAlive()) {
        LogActions.addText(`:n:${team.name} team has been defeated:n:`);

        // If the index is 1 then the player team won
        return this.stop.bind(this, parseInt(index) === 1);
      }
    }

    return null;
  }

  start() {
    LogActions.addText(":t:Battle Start:t:");

    const battleGains = new BattleGains(this.members);
    this.battleContext = {
      teams: this.teams,
      battleGains: battleGains
    };

    const battleApi = BattleApi(this.battleContext);

    this.battleTimer = setInterval(() => {
      const member = this.getNextMember();

      // console.log("Battle Turn", member.data.name);
      // console.log("member", member);

      if (member.teamIndex === 0) {
        battleApi._setCurrentTeam(this.teams[0]);
        battleApi._setOpponentTeam(this.teams[1]);
      } else {
        battleApi._setCurrentTeam(this.teams[1]);
        battleApi._setOpponentTeam(this.teams[0]);
      }

      battleGains.addGainWithMod("dex", member, Math.sqrt(1));

      battleApi._setCurrentCharacter(member);

      const context = {
        hero: member.clone(),
        battleApi
      };

      // console.log(member.battleFunction);
      member.battleFunction(context);

      const postStateAction = this.checkState();

      if (postStateAction) {
        postStateAction();
      }
    }, 1000);
  }

  stop(win: boolean) {
    LogActions.addText(":t:Battle Over:t:");
    clearTimeout(this.battleTimer);

    this.addGains(win);

    if (this.onFinish) {
      this.onFinish(win);
    }
  }

  addGains(win: boolean) {
    for (const id in this.battleContext.battleGains.battleGains) {
      const gains = this.battleContext.battleGains.battleGains[id];
      const character = this.originalMembers[id];

      for (const stat in gains) {
        // Modify gains based on a win or loss
        gains[stat] = gains[stat] * (win ? 1 : 0.1);
        character.data.statsBase[stat] += gains[stat];
      }

      character.updateTotalStats();

      LogActions.addGains(gains, character);
    }
  }
}
