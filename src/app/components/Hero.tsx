import * as React from "react";
import CCharacter from "../classes/Character";
import { withRouter, RouteComponentProps } from "react-router";
import ConfirmButton from "./controls/ConfirmButton";
import Flipper from "./controls/Flipper";
import HeroActions from "../actions/hero-actions";

import Stats from "./Stats";
import StatsGrowth from "./StatsGrowth";
import GameActions from "../actions/game-actions";

interface Props extends Partial<RouteComponentProps<{}>> {
  index: number;
  hero: CCharacter;
  options?: any[];
  debug: boolean;
  hideExp: boolean;
}

class Hero extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.goEquipment = this.goEquipment.bind(this);
    this.goSkills = this.goSkills.bind(this);
    this.goActions = this.goActions.bind(this);
    this.remove = this.remove.bind(this);
    this.buildOptions = this.buildOptions.bind(this);
    this.recruitHero = this.recruitHero.bind(this);
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

  recruitHero() {
    GameActions.recruitHero(this.props.hero);
  }

  buildOptions(options: any[]) {
    const optionsElements = [];
    for (const option of options) {
      switch (option) {
        case "equipment":
          optionsElements.push(
            <button key="equipment" onClick={this.goEquipment}>
              Equipment
            </button>
          );
          break;
        case "skills":
          optionsElements.push(
            <button key="skills" onClick={this.goSkills}>
              Skills
            </button>
          );
          break;
        case "actions":
          optionsElements.push(
            <button key="actions" onClick={this.goActions}>
              Actions
            </button>
          );
          break;
        case "remove":
          optionsElements.push(
            <ConfirmButton key="remove" onConfirm={this.remove}>
              <i className="fa fa-trash" />
            </ConfirmButton>
          );
          break;
        case "recruit":
          optionsElements.push(
            <button key="recruit" onClick={this.recruitHero}>
              Recruit
            </button>
          );
          break;
      }
    }

    return <div className="options">{optionsElements}</div>;
  }

  render() {
    const hero = this.props.hero;
    const heroData = hero.data;

    let options = null;
    if (this.props.options) {
      options = this.buildOptions(this.props.options);
    } else {
      options = this.buildOptions(["equipment", "skills", "actions", "remove"]);
    }

    let debugDisplay = null;
    if (this.props.debug || true) {
      debugDisplay = (
        <div>
          <div style={{ float: "left", marginRight: "10px" }}>
            <StatsGrowth stats={heroData.statsGrowth} />
          </div>
          <div style={{ float: "left" }}>
            <div>Potential {heroData.statsPotential}</div>
            <div>Growth Min {heroData.statsGrowthRatioMin.toFixed(2)}</div>
            <div>Growth Max {heroData.statsGrowthRatioMax.toFixed(2)}</div>
          </div>
        </div>
      );
    }

    let exp = null;
    if (!this.props.hideExp) {
      exp = (
        <div className="exp">
          <div className="bar-outer">
            <div
              className="bar-inner"
              style={{
                width:
                  (heroData.exp * 100) / hero.getExpForLevel(heroData.level) +
                  "%"
              }}
            />
          </div>
          <div className="numbers" style={{ marginTop: "-22px" }}>
            {heroData.exp.toFixed(2)} / {hero.getExpForLevel(heroData.level)}{" "}
            EXP
          </div>
        </div>
      );
    }

    const quality = hero.getQuality();

    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100px",
          marginBottom: "5px"
        }}
      >
        <Flipper direction="vertical">
          <Flipper.Front>
            <div className="hero">
              <div className="hero-inner">
                <div className={["variation", quality].join(" ")}>
                  {quality}
                </div>
                <div>
                  <span className="hero-name">{heroData.name}</span>
                  <span className="level">Lv. {heroData.level}</span>
                </div>
                <Stats stats={heroData.statsTotal} />
                <div className="clear" />
                {exp}
              </div>
            </div>
          </Flipper.Front>
          <Flipper.Back>
            <div className="hero">
              <div className="hero-inner">
                {options}
                {debugDisplay}
                <div className="clear" />
              </div>
            </div>
          </Flipper.Back>
        </Flipper>
      </div>
    );
  }
}

export default withRouter(Hero);
