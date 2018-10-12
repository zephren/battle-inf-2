import * as React from "react";
import { RouteComponentProps } from "react-router";
import Store from "../lib/store";
import GameActions from "../lib/game-actions";

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

            GameActions.saveState();
          }}
        />
      </div>
    );
  }
}
