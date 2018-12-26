import * as React from "react";
import Store from "../store";

interface Props {}

export default class LogBattleSummary extends React.Component<Props> {
  render() {
    const state = Store.getState();
    const battle = state.battle;
    const teamContainers: any[] = [];

    if (!state.battle) {
      return null;
    }

    for (const i in battle.teams) {
      const team = battle.teams[i];
      const teamElements: any = [];

      for (const j in team.members) {
        const member = team.members[j];
        const width =
          100 * (member.data.statsActual.hp / member.data.statsTotal.hp);

        teamElements.push(
          <div key={i + "-" + j}>
            <div className="member-name">{member.data.name}</div>
            <div className="health">
              <div className="health-bar" style={{ width: width + "%" }} />
            </div>
          </div>
        );
      }

      teamContainers.push(
        <div key={i} style={{ float: "left", width: "46%", padding: "2%" }}>
          <div>{team.name} Team</div>
          {teamElements}
        </div>
      );
    }

    return (
      <div className="battle-summary-container">
        <div className="battle-summary">
          {teamContainers}
          <div style={{ clear: "both" }} />
        </div>
      </div>
    );
  }
}
