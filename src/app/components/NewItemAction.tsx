import * as React from "react";
import { RouteComponentProps } from "react-router";
import Store from "../store";

import ActionBuilder from "./ActionBuilder";

interface MatchParams {}

interface Props extends RouteComponentProps<MatchParams> {}

export default class NewItemAction extends React.Component<Props> {
  render() {
    const state = Store.getState();

    return (
      <div>
        <h1>New Item Action</h1>
        <ActionBuilder
          code={state.newItemActionCode}
          saveCode={newCode => {
            state.newItemActionCode = newCode;

            Store.saveState();
          }}
        />
      </div>
    );
  }
}
