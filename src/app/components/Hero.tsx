import * as React from "react";
import CHero from "../classes/Hero";
import { withRouter, RouteComponentProps } from "react-router";
import ConfirmButton from "./controls/ConfirmButton";
import HeroActions from "../lib/hero-actions";

import Stats from "./Stats";

interface Props extends Partial<RouteComponentProps<{}>> {
  index: number;
  hero: CHero;
  noOptions?: boolean;
}

class Hero extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.goEquipment = this.goEquipment.bind(this);
    this.goSkills = this.goSkills.bind(this);
    this.goActions = this.goActions.bind(this);
    this.remove = this.remove.bind(this);
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

  remove() {
    HeroActions.removeHero(this.props.hero);
    this.props.history.push("/heroes");
  }

  render() {
    const heroData = this.props.hero.data;

    let options = null;
    if (!this.props.noOptions) {
      options = (
        <div className="options">
          <button onClick={this.goEquipment}>Equipment</button>
          <button onClick={this.goSkills}>Skills</button>
          <button onClick={this.goActions}>Actions</button>
          <ConfirmButton onConfirm={this.remove}>
            <i className="fa fa-trash" />
          </ConfirmButton>
        </div>
      );
    }

    return (
      <div className="hero">
        <div className="hero-inner">
          {options}
          <div>
            <span className="hero-name">{heroData.name}</span>
            <span className="level">Lv. {heroData.level}</span>
          </div>
          <Stats stats={heroData.statsTotal} />
          <div className="clear" />
        </div>
      </div>
    );
  }
}

export default withRouter(Hero);
