import * as React from "react";
import Store from "../lib/store";
import ILogEntry from "../interfaces/LogEntry";

export default class Main extends React.Component {
  constructor(props: any) {
    super(props);

    this.addEntry = this.addEntry.bind(this);
  }

  parseLogEntry(entry: ILogEntry): string {
    let result = entry.text;

    result = result.replace(/:b:(.*?):b:/g, `<b>$1</b>`);
    result = result.replace(/:p:(.*?):p:/g, `<b class="color-positive">$1</b>`);
    result = result.replace(/:n:(.*?):n:/g, `<b class="color-negative">$1</b>`);
    result = result.replace(/:i:(.*?):i:/g, `<b class="color-info">$1</b>`);
    result = result.replace(/:s:(.*?):s:/g, `<b class="color-special">$1</b>`);

    return result;
  }

  renderLog() {
    const log = Store.getState().log;
    const logElements = [];

    for (const entry of log) {
      logElements.push(
        <div
          className="entry"
          dangerouslySetInnerHTML={{ __html: this.parseLogEntry(entry) }}
        />
      );
    }

    return logElements;
  }

  addEntry() {
    Store.getState().log.push({
      text: "test :b:test:b: fig :p:35:p: or :n:-19:n: or :i:info:i:"
    });
    this.setState({});
  }

  render() {
    return (
      <div className="log">
        <h1>Log</h1>
        <button onClick={this.addEntry} />
        {this.renderLog()}
      </div>
    );
  }
}
