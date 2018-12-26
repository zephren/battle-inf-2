import * as React from "react";

interface Props {
  onClick?(event: React.MouseEvent<HTMLElement>): void;
  selected?: boolean;
  notify?: boolean;
  disabled?: boolean;
  style?: any;
}

class Button extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);

    this.click = this.click.bind(this);
  }

  click(event: React.MouseEvent<HTMLElement>) {
    if (!this.props.disabled) {
      this.props.onClick(event);
    }
  }

  render() {
    const className: string[] = [];

    if (this.props.selected) {
      className.push("selected");
    }

    if (this.props.notify) {
      className.push("notify");
    }

    if (this.props.disabled) {
      className.push("disabled");
    }

    return (
      <button
        className={className.join(" ")}
        style={this.props.style}
        onClick={this.click}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
