import * as React from "react";
import CHero from "../classes/Hero";
import AceEditor from "react-ace";
import Button from "./Button";
import gameActions from "../lib/game-actions";

import "brace/mode/javascript";
import "brace/theme/monokai";

interface Props {
  hero: CHero;
}

export default class ActionBuilder extends React.Component<Props, {}> {
  state: {
    code?: string;
    changed?: boolean;
  } = {};

  constructor(props: any) {
    super(props);

    this.save = this.save.bind(this);

    this.state.code =
      this.props.hero.data.battlActionCode || "console.log(hero)";
    this.state.changed = false;
  }

  save() {
    this.props.hero.data.battlActionCode = this.state.code;
    gameActions.saveState.action();
    this.setState({
      changed: false
    });
  }

  render() {
    return (
      <div>
        <h1>Action Builder</h1>
        <Button onClick={this.save} notify={this.state.changed}>
          Save
        </Button>
        <AceEditor
          value={this.state.code}
          mode="javascript"
          theme="monokai"
          onChange={code => {
            console.log(code);
            this.setState({ code, changed: true });
          }}
          name="action-editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    );
  }
}
