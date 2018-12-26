import * as React from "react";
import Store from "../../store";
import Hero from "../Hero";
import GameFunctions from "../../lib/game-functions";
import buildings from "../../config/buildings";

interface Props {}

export default class Inn extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const state = Store.getState();
    const innState = state.town.buildings.inn;
    const options: string[] = [];

    if (GameFunctions.townHasFreeHousing()) {
      options.push("recruit");
    }

    const heroElements = [];
    for (const i in innState.data.heroes) {
      const hero = innState.data.heroes[i];

      heroElements.push(
        <Hero key={i} hero={hero} index={i} options={options} />
      );
    }

    return (
      <div>
        <div style={{ float: "right" }}>
          Next Tick
          <div style={{ fontSize: "30px", textAlign: "right" }}>
            {Math.floor(
              (innState.data.lastTick + buildings.inn.tickTime - Date.now()) /
                1000
            )}
          </div>
        </div>

        <h1>Inn</h1>
        <div style={{ marginBottom: "10px" }}>
          Unused housing: {GameFunctions.townUnusedHousingCount()}
        </div>
        {heroElements}
      </div>
    );
  }
}
