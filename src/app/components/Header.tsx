import * as React from "react";
import Button from "./Button";

import { withRouter, RouteComponentProps } from "react-router";

interface Props extends Partial<RouteComponentProps<{}>> {}

const options = [
  {
    name: "Heroes",
    id: "heroes",
    onClick: function(props: Props) {
      props.history.push("/heroes");
    }
  },
  {
    name: "Inventory",
    id: "inventory",
    onClick: function(props: Props) {
      props.history.push("/inventory");
    }
  },
  {
    name: "Town",
    id: "town",
    onClick: function(props: Props) {
      props.history.push("/town");
    }
  },
  {
    name: "Options",
    id: "options",
    onClick: function(props: Props) {
      props.history.push("/options");
    }
  },
  {
    name: "Reset",
    onClick: function() {}
  }
];

class Header extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const headerElements = [];

    for (const i in options) {
      const option = options[i];
      const selected =
        this.props.location.pathname.toString().split("/")[1] === option.id;

      headerElements.push(
        <Button
          key={i}
          selected={selected}
          onClick={option.onClick.bind(this, this.props)}
        >
          {option.name}
        </Button>
      );
    }

    return <div>{headerElements}</div>;
  }
}

export default withRouter(Header);
