import * as React from "react";

interface Props {
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  selected?: boolean;
}

class Button extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.click = this.click.bind(this);
  }

  click(event: React.MouseEvent<HTMLElement>) {
    this.props.onClick(event);
  }

  render() {
    const className: string[] = [];

    if (this.props.selected) {
      className.push("selected");
    }

    return (
      <button className={className.join(" ")} onClick={this.click}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
