import * as React from "react";
import IHero from "../classes/Hero";
import { withRouter, RouteComponentProps } from "react-router";

import Stats from "./Stats";

interface Props extends Partial<RouteComponentProps<{}>> {
  index: number;
  hero: IHero;
}

class Hero extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.goEquipment = this.goEquipment.bind(this);
    this.goSkills = this.goSkills.bind(this);
    this.goActions = this.goActions.bind(this);
  }

  goEquipment() {
    this.props.history.push(`/heroes/${this.props.index}/equipment`);
  }

  goSkills() {
    this.props.history.push(`/heroes/${this.props.index}/skills`);
  }

  goActions() {
    this.props.history.push(`/heroes/${this.props.index}/actions`);
  }

  render() {
    const hero = this.props.hero;

    return (
      <div className="hero">
        <div className="hero-inner">
          <div>
            <span className="hero-name">{hero.name}</span>
            <span className="level">Lv. {hero.level}</span>
          </div>
          <div className="options">
            <button onClick={this.goEquipment}>Equipment</button>
            <button onClick={this.goSkills}>Skills</button>
            <button onClick={this.goActions}>Actions</button>
          </div>
          <Stats stats={hero.statsBase} />
          <div className="clear" />
        </div>
      </div>
    );
  }
}

export default withRouter(Hero);
