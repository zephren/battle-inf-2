import * as React from "react";
import IStats from "../interfaces/Stats";
import CStatConfig from "../classes/StatConfig";

interface Props {
  stats: IStats;
}

export default class StatsGrowth extends React.Component<Props> {
  renderStat(stat: string, value: number) {
    const valueClassName: string[] = ["value"];

    return (
      <td key={stat}>
        <div className="bar-container">
          <div
            className="bar"
            style={{
              height: value * 100 + "%"
            }}
          />
        </div>
      </td>
    );
  }

  render() {
    const stats = this.props.stats;
    const statElements: object[] = [];
    const statNames: object[] = [];

    for (const stat in stats) {
      const value: number = stats[stat];
      statElements.push(this.renderStat(stat, value));
      statNames.push(
        <td key={stat} className="stat-name">
          {CStatConfig[stat].displayName}
        </td>
      );
    }

    return (
      <div className="stats-growth">
        <table>
          <tbody>
            <tr>{statElements}</tr>
            <tr>{statNames}</tr>
          </tbody>
        </table>
      </div>
    );
  }
}
