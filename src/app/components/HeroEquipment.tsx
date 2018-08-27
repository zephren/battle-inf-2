import * as React from "react";
import { RouteComponentProps } from "react-router";
import Store from "../lib/store";
import IHero from "../interfaces/Hero";

interface MatchParams {
  index: number;
}

interface Props extends RouteComponentProps<MatchParams> {
  hero: IHero;
}

export default class HeroEquipment extends React.Component<Props> {
  render() {
    const state = Store.getState();
    const index = this.props.match.params.index;
    const hero = state.heroes[index];

    return (
      <div>
        <div>Hero Equipment</div>
        {hero.name}
      </div>
    );
  }
}
