import * as React from "react";
import IStats from "../interfaces/Stats";
import CStatConfig from "../classes/StatConfig";

interface Props {
  stats: IStats;
}

export default class Stats extends React.Component<Props> {
  renderStat(stat: string, value: number) {
    const valueClassName: string[] = ["value"];

    if (value === 0) {
      valueClassName.push("zero");
    }

    return (
      <div key={stat} className="stat">
        <div className="name">{CStatConfig[stat].displayName}</div>
        <div className={valueClassName.join(" ")}>{value}</div>
      </div>
    );
  }

  render() {
    const stats = this.props.stats;
    const statElements: object[] = [];

    for (const stat in stats) {
      const value: number = stats[stat];
      statElements.push(this.renderStat(stat, value));
    }

    return <div className="stats">{statElements}</div>;
  }
}
