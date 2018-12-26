import CCharacter from "./Character";
import CBattleTeam from "./BattleTeam";
import CBattleCharacter from "./BattleCharacter";
import BattleApi, { IBattleContext } from "../lib/battle/battle-api";
import LogActions from "../actions/log-actions";

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
  battleApi: any = null;
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

    this.battleContext = {
      teams: this.teams
    };

    this.battleApi = BattleApi(this.battleContext);
    this.battleTimer = setInterval(this.tick.bind(this), 1000);
  }

  stop(win: boolean) {
    LogActions.addText(":t:Battle Over:t:");
    clearTimeout(this.battleTimer);

    let exp = 0;
    let totalLevels = 0;
    for (const member of this.teams[1].members) {
      exp = 1 + member.data.level * member.data.statsPotential;
      totalLevels += member.data.level;
    }

    for (const member of this.teams[0].members) {
      const character = this.originalMembers[member.data.id];
      const characterExp = exp / this.teams[0].members.length;
      character.addExp(exp);
      LogActions.addExp(character.data.name, characterExp);
    }

    if (this.onFinish) {
      this.onFinish(win);
    }
  }

  tick() {
    const member = this.getNextMember();
    const battleApi = this.battleApi;

    // console.log("Battle Turn", member.data.name);

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
      postStateAction();
    }
  }
}
