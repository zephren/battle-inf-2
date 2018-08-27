import * as React from "react";

import Hero from "./Hero";
import IHero from "../interfaces/Hero";

export default class Heroes extends React.Component {
  render() {
    const heroes: IHero[] = [
      { name: "Hero A" },
      { name: "Hero B" },
      { name: "Hero C" }
    ];
    const heroElements: object[] = [];

    for (const i in heroes) {
      heroElements.push(<Hero hero={heroes[i]} index={i} />);
    }

    return (
      <div>
        <h1>Heroes</h1>

        {heroElements}
      </div>
    );
  }
}
