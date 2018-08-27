import * as React from "react";
import IHero from "../interfaces/Hero";
import { withRouter, RouteComponentProps } from "react-router";

interface Props extends Partial<RouteComponentProps<{}>> {
  index: number;
  hero: IHero;
}

class Hero extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
    console.log(props.match);
    this.goEquipment = this.goEquipment.bind(this);
  }

  goEquipment() {
    this.props.history.push(`/heroes/${this.props.index}/equipment`);
  }

  render() {
    const hero = this.props.hero;

    return (
      <div>
        {hero.name} [{this.props.index}]
        <button onClick={this.goEquipment}>Equipment</button>
      </div>
    );
  }
}

export default withRouter(Hero);
