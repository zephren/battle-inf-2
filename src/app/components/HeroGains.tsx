import * as React from "react";
import CCharacter from "../classes/Character";
import { withRouter, RouteComponentProps } from "react-router";

interface Props extends Partial<RouteComponentProps<{}>> {
  gains: any;
  hero: CCharacter;
}

class HeroGains extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const hero = this.props.hero;
    const gains = this.props.gains;
    const gainElements = [];

    for (const stat in gains) {
      const amount = gains[stat];

      if (amount > 0) {
        gainElements.push(
          <span
            key={stat}
            style={{ paddingRight: "10px", paddingBottom: "10px" }}
          >
            {stat.toUpperCase()}
            <b className="color-positive"> +{gains[stat].toFixed(3)}</b>
          </span>
        );
      }
    }

    return (
      <div className="entry">
        <b>{hero.data.name}</b>
        <div className="log-note" style={{ padding: "10px" }}>
          <div>{gainElements}</div>
        </div>
      </div>
    );
  }
}

export default HeroGains;
