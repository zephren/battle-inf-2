import * as React from "react";
import Store from "../../lib/store";
import Hero from "../Hero";

interface Props {}

export default class Inn extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const state = Store.getState();
    const innState = state.town.buildings.inn;

    const heroElements = [];
    for (const i in innState.data.heroes) {
      const hero = innState.data.heroes[i];
      console.log(hero);
      heroElements.push(
        <Hero key={i} hero={hero} index={i} options={["recruit"]} />
      );
    }

    return (
      <div>
        <h1>Inn</h1>
        {heroElements}
      </div>
    );
  }
}
