import CBattleTeam from "./BattleTeam";
import CBattleCharacter from "./BattleCharacter";
import BattleApi from "../lib/battle/battle-api";
import Hero from "./Hero";
import LogActions from "../lib/log-actions";

interface MemberOrder {
  id: string;
  value: number;
}

export default class Battle {
  teams: CBattleTeam[];
  battleTimer: any;
  members: {
    [key: string]: CBattleCharacter;
  } = {};
  memberOrder: MemberOrder[] = [];
  onFinish: () => void;

  constructor(teams: CBattleTeam[]) {
    for (const teamIndex in teams) {
      const team = teams[teamIndex];

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
    for (const team of this.teams) {
      if (!team.isAlive()) {
        LogActions.addText(`:n:${team.name} team has been defeated:n:`);
        return this.stop;
      }
    }

    return null;
  }

  start() {
    LogActions.addText(":t:Battle Start:t:");

    const battleApi = BattleApi({
      teams: this.teams
    });

    this.battleTimer = setInterval(() => {
      const member = this.getNextMember();

      console.log("Battle Turn", member.data.name);
      console.log("member", member);

      if (member.teamIndex === 0) {
        battleApi._setCurrentTeam(this.teams[0]);
        battleApi._setOpponentTeam(this.teams[1]);
      } else {
        battleApi._setCurrentTeam(this.teams[1]);
        battleApi._setOpponentTeam(this.teams[0]);
      }

      battleApi._setCurrentCharacter(member);

      const context = {
        hero: member.clone(),
        battleApi
      };

      // console.log(member.battleFunction);
      member.battleFunction(context);

      const postStateAction = this.checkState();

      if (postStateAction) {
        postStateAction.bind(this)();
      }
    }, 1000);
  }

  stop() {
    LogActions.addText(":t:Battle Over:t:");
    clearTimeout(this.battleTimer);

    if (this.onFinish) {
      this.onFinish();
    }
  }
}
