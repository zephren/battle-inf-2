import * as React from "react";

interface Props {
  compiler: string;
  framework: string;
}

export default class Main extends React.Component<Props, {}> {
  render() {
    return (
      <h1>
        LOGGING from {this.props.compiler} and {this.props.framework}!
      </h1>
    );
  }
}
