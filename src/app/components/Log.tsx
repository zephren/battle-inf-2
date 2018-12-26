import * as React from "react";
import Store from "../store";
import LogActions from "../actions/log-actions";
import Button from "./controls/Button";
import LogBattleSummary from "./LogBattleSummary";
import LogEntry from "./LogEntry";

export default class Main extends React.Component {
  messagesEnd: any = null;
  messageArea: any = null;
  shouldScroll: boolean = false;

  constructor(props: any) {
    super(props);

    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.checkScroll = this.checkScroll.bind(this);
  }

  componentDidMount() {
    setTimeout(this.scrollToBottom);
  }

  renderLog() {
    const log = Store.getState().log;
    const logElements = [];

    for (const i in log) {
      const entry = log[i];
      logElements.push(<LogEntry key={entry.entryId} entry={entry} />);
    }

    return logElements;
  }

  scrollToBottom() {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "instant" });
    }
  }

  checkScroll() {
    const state = Store.getState();

    if (state.scrollLogToBottom) {
      if (
        this.messageArea.scrollTop + this.messageArea.clientHeight + 100 >
        this.messageArea.scrollHeight
      ) {
        this.shouldScroll = true;
      }
    }
  }

  componentDidUpdate() {
    if (this.shouldScroll) {
      this.shouldScroll = false;
      this.scrollToBottom();
    }
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
        <div
          style={{
            position: "absolute",
            top: "50px",
            bottom: "0px",
            left: "0px",
            right: "0px"
          }}
        >
          <table style={{ width: "100%", height: "100%" }}>
            <tbody>
              <tr style={{ height: "0%" }}>
                <td>
                  <LogBattleSummary />
                </td>
              </tr>
              <tr style={{ height: "100%" }}>
                <td style={{ position: "relative" }}>
                  <div className="log-area" ref={el => (this.messageArea = el)}>
                    {this.renderLog()}
                    <div
                      style={{ marginTop: "50px" }}
                      ref={el => (this.messagesEnd = el)}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
