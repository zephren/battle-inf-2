import * as React from "react";
import AceEditor from "react-ace";
import Button from "./controls/Button";

import "brace/mode/javascript";
import "brace/theme/monokai";

interface Props {
  code: string;
  saveCode: (newCode: string) => void;
}

export default class ActionBuilder extends React.Component<Props, {}> {
  state: {
    code?: string;
    changed?: boolean;
  } = {};

  constructor(props: any) {
    super(props);

    this.save = this.save.bind(this);

    this.state.code = this.props.code;
    this.state.changed = false;
  }

  save() {
    if (this.props.saveCode) {
      this.props.saveCode(this.state.code);
    }

    this.setState({
      changed: false
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.save} notify={this.state.changed}>
          Save
        </Button>
        <AceEditor
          value={this.state.code}
          mode="javascript"
          theme="monokai"
          onChange={code => {
            this.setState({ code, changed: true });
          }}
          name="action-editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    );
  }
}
