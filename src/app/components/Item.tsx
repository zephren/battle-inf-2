import * as React from "react";

interface Props {
  item: object;
}

export default class Item extends React.Component<Props> {
  render() {
    return <div>Item</div>;
  }
}
