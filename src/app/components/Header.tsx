import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

interface Props extends Partial<RouteComponentProps<{}>> {}

class Header extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.click = this.click.bind(this);
  }

  click(path: string) {
    this.props.history.push(path);
  }

  resetGame() {}

  render() {
    return (
      <div>
        <button onClick={this.click.bind(this, "/heroes")}>Heroes</button>
        <button onClick={this.click.bind(this, "/inventory")}>Inventory</button>
        <button onClick={this.click.bind(this, "/town")}>Town</button>
        <button onClick={this.click.bind(this, "/options")}>Options</button>
        <button onClick={this.resetGame}>Options</button>
      </div>
    );
  }
}

export default withRouter(Header);
