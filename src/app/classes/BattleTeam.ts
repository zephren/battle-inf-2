import CCharacter from "./Character";
import CBattleCharacter from "./BattleCharacter";
import BattleCharacter from "./BattleCharacter";

export default class CBattleTeam {
  members: CBattleCharacter[];
  name: string = "Unnamed Team";
  aliveMembers: CBattleCharacter[];
  deadMembers: CBattleCharacter[];

  membersById: {
    [key: string]: CBattleCharacter;
  } = {};

  originalMembersById: {
    [key: string]: CCharacter;
  } = {};

  constructor(members: CCharacter[]) {
    this.members = [];

    for (const member of members) {
      let newMember = null;

      if (member instanceof BattleCharacter) {
        newMember = member;
      } else {
        newMember = new BattleCharacter(member.data);
      }

      this.members.push(newMember);
      this.membersById[newMember.data.id] = newMember;
      this.originalMembersById[newMember.data.id] = member;
    }

    this.aliveMembers = this.members.slice();
    this.deadMembers = [];
  }

  getMemberById(id: string) {
    return this.membersById[id];
  }

  isAlive(): boolean {
    for (const member of this.members) {
      if (member.isAlive()) {
        return true;
      }
    }

    return false;
  }

  memberDied(member: CBattleCharacter) {
    const index = this.aliveMembers.indexOf(member);
    this.aliveMembers.splice(index, 1);
    this.deadMembers.push(member);
  }
}
