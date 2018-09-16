import * as React from "react";
import Store from "../lib/store";

import Hero from "./Hero";

export default class Heroes extends React.Component {
  render() {
    const heroes = Store.getState().heroes;
    const heroElements: object[] = [];

    for (const i in heroes) {
      heroElements.push(<Hero key={i} hero={heroes[i]} index={i} />);
    }

    return (
      <div>
        <h1>Heroes</h1>

        {heroElements}
      </div>
    );
  }
}
