import * as React from "react";
import { RouteComponentProps } from "react-router";
import Store from "../lib/store";
import CHero from "../classes/Hero";

import Hero from "./Hero";

interface MatchParams {
  index: number;
}

interface Props extends RouteComponentProps<MatchParams> {
  hero: CHero;
}

export default class HeroEquipment extends React.Component<Props> {
  render() {
    const state = Store.getState();
    const index = this.props.match.params.index;
    const hero = state.heroes[index];

    return (
      <div>
        <h1>Skills</h1>
        <Hero hero={hero} index={index} />
      </div>
    );
  }
}
