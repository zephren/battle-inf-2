import * as React from "react";
import { RouteComponentProps } from "react-router";
import Store from "../lib/store";
import CHero from "../classes/Hero";

import Hero from "./Hero";
import ActionBuilder from "./ActionBuilder";

interface MatchParams {
  index: number;
}

interface Props extends RouteComponentProps<MatchParams> {
  hero: CHero;
}

export default class HeroActions extends React.Component<Props> {
  render() {
    const state = Store.getState();
    const index = this.props.match.params.index;
    const hero = state.heroes[index];

    return (
      <div>
        <h1>Actions</h1>
        <Hero hero={hero} index={index} />
        <ActionBuilder hero={hero} />
      </div>
    );
  }
}
