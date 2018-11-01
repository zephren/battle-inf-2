import * as React from "react";
import Store from "../store";

interface Props {}

export default class HeroSkills extends React.Component<Props> {
  render() {
    const state = Store.getState();

    if (!state.battle) {
      return null;
    }

    return <div className="battle-summary">Battle Summary</div>;
  }
}
