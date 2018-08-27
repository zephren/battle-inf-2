import * as React from "react";

interface Props {
  hero: object;
}

interface Hero {
  name: string;
}

export default class HeroEquipment extends React.Component<Props> {
  render() {
    const hero: Hero = [{ name: "Test Hero" }][0];

    return (
      <div>
        <div>Hero Equipment</div>
        {hero.name}
      </div>
    );
  }
}
