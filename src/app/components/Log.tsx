import * as React from "react";
import Store from "../lib/store";
import ILogEntry from "../interfaces/LogEntry";
import Hero from "./Hero";
import LogActions from "../lib/log-actions";
import Button from "./controls/Button";

export default class Main extends React.Component {
  messagesEnd: any;
  messageArea: any;

  constructor(props: any) {
    super(props);

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.checkScroll = this.checkScroll.bind(this);
  }

  componentDidMount() {
    setTimeout(this.scrollToBottom);
  }

  parseLogEntry(entry: ILogEntry, index: string): object {
    if (entry.type === "text") {
      let result = entry.data.text;

      result = result.replace(/:b:(.*?):b:/g, `<b>$1</b>`);
      result = result.replace(
        /:p:(.*?):p:/g,
        `<b class="color-positive">$1</b>`
      );
      result = result.replace(
        /:n:(.*?):n:/g,
        `<b class="color-negative">$1</b>`
      );
      result = result.replace(/:i:(.*?):i:/g, `<b class="color-info">$1</b>`);
      result = result.replace(
        /:s:(.*?):s:/g,
        `<b class="color-special">$1</b>`
      );
      result = result.replace(/:pad:/g, `<p class="battle-log-padding"></p>`);
      result = result.replace(
        /:t:(.*?):t:/g,
        `<b class="color-info log-header">&mdash; $1 &mdash;</b>`
      );

      result = result.replace(/:r(\d):(.*?):r\d:/g, `<b class="r$1">$2</b>`);

      result = result.replace(
        /:def:(.*?):def:/g,
        `<d class="log-note"><table style="width:100%"><tbody><tr><td>$1</td><td class="color-red" style="text-align:right"><i class="fa fa-times fa-2x"/></td></tr></tbody></table>`
      );

      result = result.replace(
        /:item:(.*?):item:/g,
        `<d class="log-note"><table style="width:100%"><tbody><tr><td>$1</td><td class="color-green" style="text-align:right"><i class="fa fa-gift fa-2x"/></td></tr></tbody></table>`
      );

      return (
        <div
          key={index}
          className="entry"
          dangerouslySetInnerHTML={{ __html: result }}
        />
      );
    }

    if (entry.type === "character") {
      return <Hero key={index} hero={entry.data.character} noOptions={true} />;
    }

    return null;
  }

  renderLog() {
    const log = Store.getState().log;
    const logElements = [];

    for (const i in log) {
      const entry = log[i];
      logElements.push(this.parseLogEntry(entry, i));
    }

    return logElements;
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "instant" });
  }

  checkScroll() {
    const state = Store.getState();
    let scroll = false;

    if (state.scrollLogToBottom) {
      if (
        this.messageArea.scrollTop + this.messageArea.clientHeight + 100 >
        this.messageArea.scrollHeight
      ) {
        scroll = true;
      }
    }

    setTimeout(() => {
      if (scroll) {
        this.scrollToBottom();
      }
    });
  }

  clearLog() {
    LogActions.clearLog();
  }

  render() {
    this.checkScroll();

    return (
      <div className="log">
        <div style={{ float: "right", verticalAlign: "top" }}>
          <Button onClick={this.clearLog}>Clear</Button>
        </div>
        <h1>Battle Log</h1>
        <div className="log-area" ref={el => (this.messageArea = el)}>
          {this.renderLog()}
          <div
            style={{ marginTop: "50px" }}
            ref={el => (this.messagesEnd = el)}
          />
        </div>
      </div>
    );
  }
}
