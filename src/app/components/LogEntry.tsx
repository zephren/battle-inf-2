import * as React from "react";
import ILogEntry from "../interfaces/LogEntry";
import Hero from "./Hero";
import statNames from "../classes/StatConfig";

interface Props {
  entry: ILogEntry;
}

export default class LogEntry extends React.Component<Props> {
  state = {
    entryId: ""
  };

  constructor(props: Props) {
    super(props);

    this.state.entryId = props.entry.entryId;
  }

  shouldComponentUpdate(nextProps: Props) {
    if (this.props.entry.entryId === this.state.entryId) {
      return false;
    }

    return true;
  }

  render() {
    const entry = this.props.entry;

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
        `<b class="log-note"><table style="width:100%"><tbody><tr><td>$1</td><td class="color-red" style="text-align:right"><i class="fa fa-times fa-2x"/></td></tr></tbody></table></b>`
      );

      result = result.replace(
        /:item:(.*?):item:/g,
        `<b class="log-note"><table style="width:100%"><tbody><tr><td>$1</td><td class="color-green" style="text-align:right"><i class="fa fa-gift fa-2x"/></td></tr></tbody></table></b>`
      );

      result = result.replace(
        /:exp:(.*?):exp:/g,
        `<b class="log-note"><table style="width:100%"><tbody><tr><td><b>$1</b></td><td class="color-green" style="text-align:right;font-size:20px;font-weight:bold">XP</td></tr></tbody></table></b>`
      );

      return (
        <div className="entry" dangerouslySetInnerHTML={{ __html: result }} />
      );
    }

    if (entry.type === "character") {
      return <Hero hero={entry.data.character} options={[]} hideExp={true} />;
    }

    if (entry.type === "exp") {
      return (
        <div className="entry">
          <b className="log-note">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td>
                    <b>{entry.data.name}</b>
                    &nbsp;&nbsp;&nbsp;
                    <b className="color-green">+{entry.data.exp.toFixed(2)}</b>
                  </td>
                  <td
                    className="color-green"
                    style={{
                      textAlign: "right",
                      fontSize: "20px",
                      fontWeight: "bold"
                    }}
                  >
                    XP
                  </td>
                </tr>
              </tbody>
            </table>
          </b>
        </div>
      );
    }

    return null;
  }
}
