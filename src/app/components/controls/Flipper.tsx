import * as React from "react";

enum flipDirections {
  horizontal = "horizontal",
  vertical = "vertical"
}

interface FlipperProps {
  direction?: "vertical" | "horizontal";
  disableFlip?: boolean;
}

interface FlipperSideProps {
  children: any[];
}

class Flipper extends React.Component<FlipperProps, {}> {
  static Front: any;
  static Back: any;

  render() {
    const flipDirection = this.props.direction || "horizontal";

    return (
      <div className={"flipper-container flip-" + flipDirection}>
        <div
          className={["flipper", this.props.disableFlip ? "disabled" : ""].join(
            " "
          )}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

function FlipperSide(role: string, props: FlipperSideProps) {
  return <ul className={[role, "side"].join(" ")}>{props.children}</ul>;
}

Flipper.Front = FlipperSide.bind(null, "front");
Flipper.Back = FlipperSide.bind(null, "back");

export default Flipper;
