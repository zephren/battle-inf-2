import * as React from "react";

interface Props {
  onConfirm?(event: React.MouseEvent<HTMLElement>): void;
}

class Button extends React.Component<Props, {}> {
  state: {
    confirming?: boolean;
  } = {};

  constructor(props: any) {
    super(props);

    this.confirming = this.confirming.bind(this);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  confirming() {
    this.setState({
      confirming: true
    });
  }

  confirm(event: React.MouseEvent<HTMLElement>) {
    this.props.onConfirm(event);
  }

  cancel() {
    this.setState({
      confirming: false
    });
  }

  render() {
    let button = null;

    if (this.state.confirming) {
      button = (
        <span>
          <button className="" onClick={this.confirm}>
            <i className="fa fa-check" />
          </button>
          <button className="" onClick={this.cancel}>
            <i className="fa fa-times" />
          </button>
        </span>
      );
    } else {
      button = (
        <span>
          <button onClick={this.confirming}>{this.props.children}</button>
        </span>
      );
    }

    return button;
  }
}

export default Button;
